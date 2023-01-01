import React from "react";
import * as S from "@components/common/FeedImage/styles";

const FeedImage = ({ feedImg }) => (
  <S.FeedBox>
    <img src={feedImg} />
  </S.FeedBox>
);

export default FeedImage;
