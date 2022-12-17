import React, { useState } from "react";
import { Map as KaKaoMap, MapMarker } from "react-kakao-maps-sdk";
import useGeolocation from "@/hooks/useGeolocation";
import { CurrentPositionButton, MapLayout } from "@/pages/Map/styles";
import { DEFAULT_POSITION } from "@/constants/map";

const initialPositionState = {
  level: 5,
  center: DEFAULT_POSITION,
};

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
  const [centerPosition, setCenterPosition] = useState(initialPositionState);
  const { isLoading, error, currentPosition } = useGeolocation({
    geolocationOptions,
    clicked,
    successCallback: (coords) =>
      setCenterPosition((prevState) => ({ ...prevState, center: coords })),
  });

  const centerChangeHandler = (map) => {
    setCenterPosition((prevState) => ({
      ...prevState,
      level: map.getLevel(),
      center: {
        lat: map.getCenter().getLat(),
        lng: map.getCenter().getLng(),
      },
    }));
  };

  const myLocationClickHandler = () => setClicked(!clicked);

  return (
    <MapLayout isLoading={isLoading}>
      <KaKaoMap
        center={centerPosition.center}
        style={mapSize}
        onCenterChanged={centerChangeHandler}
        level={centerPosition.level}
        isPanto={true}
      >
        {!isLoading && !error?.message && (
          <MapMarker position={currentPosition}></MapMarker>
        )}
        <CurrentPositionButton>
          <button
            type="button"
            className="btn-my-location"
            onClick={myLocationClickHandler}
          >
            현재 위치
          </button>
        </CurrentPositionButton>
      </KaKaoMap>
    </MapLayout>
  );
};

export default Map;
