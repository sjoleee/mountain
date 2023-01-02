import React from "react";
import * as S from "@components/common/ProfileImage/styles";

const ProfileImage = ({ profileImg, width, height }) => {
  return (
    <S.Profile width={width} height={height}>
      <img src={profileImg} />
    </S.Profile>
  );
};

export default ProfileImage;
