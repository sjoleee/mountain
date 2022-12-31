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
import * as S from "@components/Map/styles";

import useGeolocation from "@hooks/useGeolocation";
import * as MAP from "@constants/map";

import { searchPostsByPos, getMountainInfo } from "../../apis";
import { isLoginState } from "../../store/userState";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

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
    geolocationOptions: MAP.GET_OPTIONS,
    isMyLocBtnClicked,
    successCallback: ({ lat, lng }) => {
      map?.setCenter(new kakao.maps.LatLng(lat, lng));
    },
  });
  const navigate = useNavigate();

  const isLogin = useRecoilValue(isLoginState);

  const handleMyLocBtnClick = () => setIsMyLocBtnClicked((prev) => !prev);

  const handleMarkerClick = async (marker) => {
    const mntnInfo = await getMountainInfo(marker.id);

    setSelectedMarker({
      ...marker,
      ...mntnInfo?.mountain,
      feeds: mntnInfo?.feeds || [],
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

    displayNearbyMntnAndPosts({
      ...MAP.SEARCH_OPTIONS,
      bounds: map.getBounds(),
    });
  }, [map, level, isDragEnd]);

  return (
    <KakaoMap
      onCreate={setMap}
      center={MAP.DEFAULT_POSITION}
      style={MAP.MAP_SIZE}
      level={level}
      isPanto={true}
      draggable={true}
      onZoomChanged={(map) => setLevel(map.getLevel())}
      onDragEnd={() => setIsDragEnd((prev) => !prev)}
    >
      {isLoading && <Spinner />}

      {/* current position marker */}
      {!isLoading && !error?.message && (
        <MapMarker
          position={currentPosition}
          image={MAP.MY_LOCATION_ICON_PROPS}
        />
      )}

      {/* mountain marker */}
      {nearbyMountainList?.map((mntn) => (
        <MapMarker
          key={mntn.id}
          position={mntn.position}
          zIndex={isSelectedMarker(mntn) ? 10 : 0}
          onClick={() => handleMarkerClick(mntn)}
          image={MAP.MNTN_MARKER_ICON_PROPS}
        />
      ))}

      {/* search result marker */}
      {searchedMountainList?.map((mntn) => (
        <MapMarker
          key={mntn.id}
          position={mntn.position}
          zIndex={isSelectedMarker(mntn) ? 10 : 0}
          onClick={() => handleMarkerClick(mntn)}
          image={MAP.SEARCHED_MNTN_MARKER_ICON_PROPS}
        />
      ))}

      {/* post marker */}
      <MarkerClusterer
        averageCenter={true}
        minLevel={6}
        styles={MAP.CLUSTER_STYLE_PROPS}
      >
        {nearbyPostList?.map(({ _id, feedImg, lat, lng }) => (
          <CustomOverlayMap
            key={_id}
            position={{ lat, lng }}
            xAnchor={0.3}
            yAnchor={0.91}
          >
            <S.PostImgBox>
              <img
                src={feedImg}
                onClick={() => navigate(`/feeds?feed-id=${_id}`)}
              />
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
          handleSearchSubmit(searchInput, MAP.SEARCH_OPTIONS)
        }
      />
      <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
      <MyLocationButton handleMyLocBtnClick={handleMyLocBtnClick} />
    </KakaoMap>
  );
};

export default Maps;
