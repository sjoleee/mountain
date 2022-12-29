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
import {
  DEFAULT_POSITION,
  TOUR_SPOT_CODE,
  MAX_MARKERS_NUM_DISPLAY_SCREEN,
} from "@constants/map";
import { searchPostsByPos, getMountainInfo } from "../../apis";
import { isLoginState } from "../../store/userState";
import { useRecoilValue } from "recoil";

const geolocationOptions = {
  //timeout: 5000, // 최대 대기 시간
  maximumAge: 30000, // 캐시 지속 시간
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

const searchOptions = {
  category_group_code: TOUR_SPOT_CODE,
  size: MAX_MARKERS_NUM_DISPLAY_SCREEN,
};

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
    successCallback: ({ lat, lng }) => {
      map?.setCenter(new kakao.maps.LatLng(lat, lng));
    },
  });

  const isLogin = useRecoilValue(isLoginState);

  const handleMyLocBtnClick = () => setIsMyLocBtnClicked((prev) => !prev);

  const handleMarkerClick = async (marker) => {
    const mntnInfo = await getMountainInfo(marker.id);

    setSelectedMarker({
      ...marker,
      ...mntnInfo?.mountain,
      posts: mntnInfo?.posts || [],
      users: mntnInfo?.users || [],
    });

    const { lat, lng } = marker.position;
    map.setCenter(new kakao.maps.LatLng(lat, lng + 0.02));
  };

  const handleSearchSubmit = async (searchInput, searchOptions) => {
    const [mountainList, bounds] = await searchPlaces(
      searchInput,
      searchOptions
    );

    setSearchedMountainList(mountainList);
    setIsSearchListOverlayOpen(true);
    map.setBounds(bounds);
  };

  const handleSearchResultClose = () => {
    setSearchedMountainList();
    setIsSearchListOverlayOpen(false);
  };

  const handleInfoCardClose = () => {
    setSelectedMarker();
  };

  const displayMountainMarkers = (places, options) => {
    let bounds;

    if (!options.bounds) {
      bounds = new kakao.maps.LatLngBounds();
    }

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
      !options.bounds &&
        bounds.extend(new kakao.maps.LatLng(Number(y), Number(x)));
    }
    return [mountainList, bounds];
  };

  const searchPlaces = (keyword, options) => {
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
        options
      )
    )
      .then((res) => displayMountainMarkers(res, options))
      .catch((error) => console.log(error));
  };

  const getNearbyPosts = async () => {
    const { Ma: swLat, La: swLng } = map.getBounds().getSouthWest();
    const { Ma: neLat, La: neLng } = map.getBounds().getNorthEast();

    const postList = await searchPostsByPos({
      params: {
        swLat,
        swLng,
        neLat,
        neLng,
      },
    });
    return postList;
  };

  const isSelectedMarker = (mntn) => selectedMarker?.id === mntn.id;

  const displayNearbyMntnAndPosts = async (searchOptions) => {
    try {
      const [mountainList, _] = await searchPlaces("산", searchOptions);
      setNearbyMountainList(mountainList);
    } catch (error) {
      console.log(error);
    }

    const postList = await getNearbyPosts();
    setNearbyPostList(postList);
  };

  useEffect(() => {
    if (!map) return;

    displayNearbyMntnAndPosts({ ...searchOptions, bounds: map.getBounds() });
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
        {nearbyPostList?.map(({ id, feedImg, lat, lng }) => (
          <CustomOverlayMap
            key={id}
            position={{ lat, lng }}
            xAnchor={0.3}
            yAnchor={0.91}
          >
            <S.PostImgBox>
              <img src={feedImg} />
            </S.PostImgBox>
          </CustomOverlayMap>
        ))}
      </MarkerClusterer>

      {/* marker info overlay */}
      {selectedMarker && (
        <>
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
          {isLogin && <SideBar selectedMountain={selectedMarker} />}
        </>
      )}

      {/* search result */}
      <SearchList
        isOpen={isSearchListOverlayOpen}
        mntnList={searchedMountainList}
        handleSearchItemClick={handleMarkerClick}
        handleSearchResultClose={handleSearchResultClose}
      />

      <MountainSearchBar
        handleSearchSubmit={(searchInput) =>
          handleSearchSubmit(searchInput, searchOptions)
        }
        searchCallback={displayMountainMarkers}
        style={{
          top: "60px",
          left: "10px",
          width: "200px",
          height: "40px",
          borderRadius: "20px",
          backgroundColor: "white",
        }}
      />
      <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
      <MyLocationButton handleMyLocBtnClick={handleMyLocBtnClick} />
    </KakaoMap>
  );
};

export default Maps;
