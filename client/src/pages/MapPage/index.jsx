import React, { useState } from "react";
import { Map as KaKaoMap, MapMarker } from "react-kakao-maps-sdk";
import useGeolocation from "@/hooks/useGeolocation";
import {
  MyLocationButton,
  MapLayout,
  LoadingBox,
} from "@/pages/MapPage/styles";
import { DEFAULT_POSITION } from "@/constants/map";

const geolocationOptions = {
  timeout: 5000, // 최대 대기 시간
  maximumAge: 30000, // 캐시 지속 시간
};

const mapSize = {
  width: "100vw",
  height: "100vh",
};

const Map = () => {
  const [clicked, setClicked] = useState(false);
  const [centerPosition, setCenterPosition] = useState(DEFAULT_POSITION);
  const { isLoading, error, currentPosition } = useGeolocation({
    geolocationOptions,
    clicked,
    successCallback: (coords) => setCenterPosition(() => coords),
  });

  const centerChangeHandler = (map) => {
    setCenterPosition(() => ({
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    }));
  };

  const myLocationClickHandler = () => setClicked(!clicked);

  return (
    <MapLayout>
      {isLoading && <LoadingBox>로딩중..</LoadingBox>}
      <KaKaoMap
        center={centerPosition}
        style={mapSize}
        onCenterChanged={centerChangeHandler}
        isPanto={true}
      >
        {!isLoading && !error?.message && (
          <MapMarker position={currentPosition}></MapMarker>
        )}
        <MyLocationButton>
          <button
            type="button"
            className="btn-my-location"
            onClick={myLocationClickHandler}
          >
            현재 위치
          </button>
        </MyLocationButton>
      </KaKaoMap>
    </MapLayout>
  );
};

export default Map;
