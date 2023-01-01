import React, { useState, useEffect, useRef } from "react";
import {
  Map as KakaoMap,
  MapMarker,
  MarkerClusterer,
  ZoomControl,
} from "react-kakao-maps-sdk";

import MyLocationButton from "@components/Map/MyLocationButton";
import MountainSearchBar from "@components/MountainSearchBar";
import SearchList from "@components/Map/SearchList";
import InfoOverlay from "@components/Map/InfoOverlay";
import Spinner from "@components/common/Spinner";
import SideBar from "@components/SideBar";
import Marker from "@components/Map/Marker";
import PostMarker from "@components/Map/PostMarker";

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
      <Marker
        List={nearbyMountainList}
        isSelectedMarker={isSelectedMarker}
        clickHandler={handleMarkerClick}
        image={MAP.MNTN_MARKER_ICON_PROPS}
      />

      {/* search result marker */}
      <Marker
        List={searchedMountainList}
        isSelectedMarker={isSelectedMarker}
        clickHandler={handleMarkerClick}
        image={MAP.SEARCHED_MNTN_MARKER_ICON_PROPS}
      />

      {/* post marker */}
      <MarkerClusterer
        averageCenter={true}
        minLevel={6}
        styles={MAP.CLUSTER_STYLE_PROPS}
      >
        {nearbyPostList.map((post) => (
          <PostMarker
            key={post._id}
            post={post}
            clickHandler={() => navigate(`/feeds?feed-id=${post._id}`)}
          />
        ))}
      </MarkerClusterer>

      {/* marker info overlay */}
      {selectedMarker && (
        <>
          <InfoOverlay
            selectedMarker={selectedMarker}
            handleInfoCardClose={handleInfoCardClose}
          />
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
