import React from "react";
import * as S from "./styles";
import Button from "@components/common/Button";

const index = () => {
  return (
    <S.PageLayout>
      <S.UserInfoContainer>
        <S.UserLeftInfoContainer>
          <S.UserProfileImgContainer>
            <S.UserProfileImage alt="프로필 사진" />
            <Button>수정하기</Button>
          </S.UserProfileImgContainer>
          <S.UserProfileDescription></S.UserProfileDescription>
        </S.UserLeftInfoContainer>
        <S.UserRightInfoContainer></S.UserRightInfoContainer>
      </S.UserInfoContainer>
      <S.UserBottomInfoContainer>
        <S.UserFeedInfoContainer></S.UserFeedInfoContainer>
        <S.UserBtnContainer></S.UserBtnContainer>
      </S.UserBottomInfoContainer>
    </S.PageLayout>
  );
};

export default index;
