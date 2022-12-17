import { useState, useEffect } from "react";
import { DEFAULT_POSITION } from "../constants/map";

const useGeolocation = ({ options, successCallback, clicked }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(DEFAULT_POSITION);

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition(
      getPositionSuccess,
      getPositionError,
      options
    );
  };

  const getPositionSuccess = (position) => {
    const coords = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(coords);
    successCallback(coords);
    setIsLoading(false);
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
  }, [clicked]);

  return {
    isLoading,
    error,
    currentPosition,
    getPosition,
  };
};

export default useGeolocation;
