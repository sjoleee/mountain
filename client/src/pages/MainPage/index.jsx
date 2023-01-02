import React from "react";
import * as S from "@pages/MainPage/styles";
import video from "../../../public/video/video.mp4";

const MainPage = () => {
  return (
    <div>
      <S.MainPageLayout />
      <S.VideoPlayer autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </S.VideoPlayer>
    </div>
  );
};

export default MainPage;
