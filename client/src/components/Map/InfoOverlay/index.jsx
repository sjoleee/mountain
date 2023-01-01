import React from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import InfoCard from "@components/Map/InfoCard";

const InfoOverlay = ({ selectedMarker, handleInfoCardClose }) => {
  return (
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
  );
};

export default InfoOverlay;
