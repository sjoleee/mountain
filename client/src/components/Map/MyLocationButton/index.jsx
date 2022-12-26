import React from "react";
import * as S from "@components/Map/MyLocationButton/styles";
import location from "@assets/location.png";

const MyLocationButton = ({ handleMyLocBtnClick }) => {
  return (
    <S.MyLocationButtonBox>
      <button
        type="button"
        className="btn-my-location"
        onClick={handleMyLocBtnClick}
      >
        <img src={location} />
      </button>
    </S.MyLocationButtonBox>
  );
};

export default MyLocationButton;
