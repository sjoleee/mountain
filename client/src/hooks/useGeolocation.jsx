import { useState, useEffect, useRef } from "react";
import { DEFAULT_POSITION } from "@/constants/map";

const useGeolocation = ({
  map,
  geolocationOptions,
  successCallback = () => {},
  isMyLocBtnClicked,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lng: 0 });

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(
      getPositionSuccess,
      getPositionError,
      geolocationOptions
    );
  };

  const getPositionSuccess = (position) => {
    const coords = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(coords);
    setIsLoading(false);
    successCallback(coords);
  };

  const getPositionError = (error) => {
    setError({ message: error.message });
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (!navigator.geolocation) {
      setError({
        meesage: "해당 브라우저는 Geolocation 서비스를 제공하지 않습니다.",
      });
      return;
    }
    getPosition();
  }, [map, isMyLocBtnClicked]);

  return {
    isLoading,
    error,
    currentPosition,
    getPosition,
  };
};

export default useGeolocation;
