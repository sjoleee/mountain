import React from "react";
import * as S from "./styles";

const FeedInfo = () => {
  return (
    <>
      <S.FeedInfoTopContainer>
        <S.UserProfileContainer>
          <S.UserProfileImg alt="유저 프로필이미지" />
          <S.UserName>{"유저아이디"}</S.UserName>
        </S.UserProfileContainer>
        <S.FeedTitle>피드 제목</S.FeedTitle>
      </S.FeedInfoTopContainer>
      <S.FeedCommentContainer>
        <S.FeedCommentSubject>댓글</S.FeedCommentSubject>
      </S.FeedCommentContainer>
    </>
  );
};

export default FeedInfo;
