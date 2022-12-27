import React, { useState, useEffect, useRef } from "react";
import {
  Map as KakaoMap,
  MapMarker,
  CustomOverlayMap,
  MarkerClusterer,
  ZoomControl,
} from "react-kakao-maps-sdk";
import MyLocationButton from "@components/Map/MyLocationButton";
import InfoCard from "@components/Map/InfoCard";
import MountainSearchBar from "@components/MountainSearchBar";
import SearchList from "@components/Map/SearchList";
import Spinner from "../common/Spinner";
import SideBar from "@components/SideBar";

import useGeolocation from "@hooks/useGeolocation";
import mntnMarkerIcon from "@assets/mntn_marker.png";
import searchedMntnMarkerIcon from "@assets/searched_mntn_marker.png";
import myLocationIcon from "@assets/my_location.png";
import * as S from "@components/Map/styles";
import axios from "axios";
import {
  DEFAULT_POSITION,
  TOUR_SPOT_CODE,
  MAX_MARKERS_NUM_DISPLAY_SCREEN,
} from "@constants/map";

const geolocationOptions = {
  //timeout: 5000, // 최대 대기 시간
  //maximumAge: 30000, // 캐시 지속 시간
};

const mapSize = {
  width: "100vw",
  height: "100vh",
};

const mntnMarkerIconProps = {
  src: mntnMarkerIcon,
  size: {
    width: 40,
    height: 47,
  },
  options: {
    offset: {
      x: 20,
      y: 60,
    },
  },
};

const searchedMntnMarkerIconProps = {
  src: searchedMntnMarkerIcon,
  size: {
    width: 40,
    height: 47,
  },
  options: {
    offset: {
      x: 14,
      y: 60,
    },
  },
};

const myLocationIconProps = {
  src: myLocationIcon,
  size: { width: 37, height: 40 },
};

const clusterStyleProps = [
  {
    background: "rgb(88 252 192 / 92%)",
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: "3.5rem",
    width: "3.5rem",
    height: "3.5rem",
    borderRadius: "50%",
  },
];

const Maps = () => {
  const [map, setMap] = useState(null);
  const searchMapRef = useRef(new kakao.maps.services.Places());
  const [isDragEnd, setIsDragEnd] = useState(false);
  const [level, setLevel] = useState(6);

  const [isMyLocBtnClicked, setIsMyLocBtnClicked] = useState(false);
  const [nearbyMountainList, setNearbyMountainList] = useState([]);
  const [nearbyPostList, setNearbyPostList] = useState([]);
  const [searchedMountainList, setSearchedMountainList] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState();
  const [isSearchListOverlayOpen, setIsSearchListOverlayOpen] = useState(false);

  const { isLoading, error, currentPosition } = useGeolocation({
    map,
    geolocationOptions,
    isMyLocBtnClicked,
    successCallback: ({ lat, lng }) =>
      map?.setCenter(new kakao.maps.LatLng(lat, lng)),
  });

  const handleMyLocBtnClick = () => setIsMyLocBtnClicked((prev) => !prev);

  const setSelectedMarkerAndFocus = (marker) => {
    axios.get(`/mountains/${marker.id}`).then(({ data }) => {
      setSelectedMarker({
        ...marker,
        ...data,
      });

      const { lat, lng } = marker.position;
      map.setCenter(new kakao.maps.LatLng(lat, lng + 0.02));
    });
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarkerAndFocus(marker);
  };
  const handleSearchItemClick = (item) => {
    setSelectedMarkerAndFocus(item);
  };

  const handleSearchSubmit = async (searchInput) => {
    const response = await searchPlaces(searchInput);
    setSearchedMountainList(response);
    setIsSearchListOverlayOpen(true);
  };

  const handleSearchResultClose = () => {
    setSearchedMountainList();
    setIsSearchListOverlayOpen(false);
  };

  const handleInfoCardClose = () => {
    setSelectedMarker();
  };

  const displayMountainMarkers = (places) => {
    const mountainList = [];
    for (let {
      id,
      place_name: mntiname,
      address_name: mntiadd,
      x,
      y,
    } of places) {
      mountainList.push({
        id,
        mntiname,
        mntiadd,
        position: {
          lat: Number(y),
          lng: Number(x),
        },
      });
    }
    return mountainList;
  };

  const searchOptions = {
    category_group_code: TOUR_SPOT_CODE,
    size: MAX_MARKERS_NUM_DISPLAY_SCREEN,
    bounds: map?.getBounds(),
  };

  const searchPlaces = (keyword) => {
    return new Promise((resolve, reject) =>
      searchMapRef.current.keywordSearch(
        keyword,
        (result, status) => {
          const STATUS = kakao.maps.services.Status;

          if (status === STATUS.OK) {
            return resolve(result);
          }
          reject(status);
        },
        searchOptions
      )
    )
      .then((res) => displayMountainMarkers(res))
      .catch((err) => console.log(err));
  };

  const getNearbyPosts = () => {
    const { Ma: swLat, La: swLng } = map.getBounds().getSouthWest();
    const { Ma: neLat, La: neLng } = map.getBounds().getNorthEast();

    axios
      .get(`/map/posts`, { params: { swLat, swLng, neLat, neLng } })
      .then((response) => setNearbyPostList(response.data));
  };

  const isSelectedMarker = (mntn) => selectedMarker?.id === mntn.id;

  useEffect(() => {
    if (!map) return;

    const displayNearbyMntnMarker = async () => {
      const response = await searchPlaces("산");
      setNearbyMountainList(response);
    };

    displayNearbyMntnMarker();
    getNearbyPosts();
  }, [map, level, isDragEnd]);

  return (
    <KakaoMap
      onCreate={setMap}
      center={DEFAULT_POSITION}
      style={mapSize}
      level={level}
      isPanto={true}
      draggable={true}
      onZoomChanged={(map) => setLevel(map.getLevel())}
      onDragEnd={() => setIsDragEnd((prev) => !prev)}
    >
      {isLoading && <Spinner />}

      {/* current position marker */}
      {!isLoading && !error?.message && (
        <MapMarker position={currentPosition} image={myLocationIconProps} />
      )}

      {/* mountain marker */}
      {nearbyMountainList?.map((mntn) => (
        <MapMarker
          key={mntn.id}
          position={mntn.position}
          zIndex={isSelectedMarker(mntn) ? 10 : 0}
          onClick={() => handleMarkerClick(mntn)}
          image={mntnMarkerIconProps}
        />
      ))}

      {/* search result marker */}
      {searchedMountainList?.map((mntn) => (
        <MapMarker
          key={mntn.id}
          position={mntn.position}
          zIndex={isSelectedMarker(mntn) ? 10 : 0}
          onClick={() => handleMarkerClick(mntn)}
          image={searchedMntnMarkerIconProps}
        />
      ))}

      {/* post marker */}
      <MarkerClusterer
        averageCenter={true}
        minLevel={6}
        styles={clusterStyleProps}
      >
        {nearbyPostList?.map(({ id, img, position }) => (
          <CustomOverlayMap
            key={id}
            position={position}
            xAnchor={0.3}
            yAnchor={0.91}
          >
            <S.PostImgBox>
              <img src={img} />
            </S.PostImgBox>
          </CustomOverlayMap>
        ))}
      </MarkerClusterer>

      {/* marker info overlay */}
      {selectedMarker && (
        <CustomOverlayMap
          position={selectedMarker.position}
          zIndex={100}
          yAnchor={1.95}
          xAnchor={0.45}
        >
          <InfoCard
            selectedMountain={selectedMarker}
            handleInfoCardClose={handleInfoCardClose}
          />
        </CustomOverlayMap>
      )}

      {/* search result */}
      <SearchList
        isOpen={isSearchListOverlayOpen}
        mntnList={searchedMountainList}
        handleSearchItemClick={handleSearchItemClick}
        handleSearchResultClose={handleSearchResultClose}
      />

      <SideBar selectedMountain={selectedMarker} />
      <MountainSearchBar handleSearchSubmit={handleSearchSubmit} />
      <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
      <MyLocationButton handleMyLocBtnClick={handleMyLocBtnClick} />
    </KakaoMap>
  );
};

export default Maps;
