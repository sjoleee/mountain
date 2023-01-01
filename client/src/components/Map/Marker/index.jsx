import React from "react";
import { MapMarker } from "react-kakao-maps-sdk";

const Marker = ({ List, isSelectedMarker, clickHandler, image }) =>
  List?.map((item) => (
    <MapMarker
      key={item.id}
      position={item.position}
      zIndex={isSelectedMarker(item) ? 10 : 0}
      onClick={() => clickHandler(item)}
      image={image}
    />
  ));

export default Marker;
