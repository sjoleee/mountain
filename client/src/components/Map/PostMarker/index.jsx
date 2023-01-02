import React from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";
import * as S from "@components/Map/PostMarker/styles";

const PostMarker = ({ post: { id, feedImg, lat, lng }, clickHandler }) => {
  return (
    <CustomOverlayMap
      key={id}
      position={{ lat, lng }}
      xAnchor={0.3}
      yAnchor={0.91}
    >
      <S.PostImgBox>
        <img src={feedImg} onClick={clickHandler} />
      </S.PostImgBox>
    </CustomOverlayMap>
  );
};

export default PostMarker;
