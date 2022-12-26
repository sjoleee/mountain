import React from "react";
import Tags from "../common/Tags";
import * as S from "./styles";

const FeedInfo = ({ profileImg, author, content, comments, tags }) => {
  return (
    <>
      <S.FeedInfoTopContainer>
        <S.UserProfileContainer>
          <S.UserProfileImg src={profileImg} alt="유저 프로필이미지" />
          <S.UserName>{author}</S.UserName>
        </S.UserProfileContainer>
        <S.ContentWrapper>
          <S.FeedContent>{content}</S.FeedContent>
        </S.ContentWrapper>
        <S.TagsDisplay>
          {tags.map((tag) => (
            <S.TagSpan>#{tag.tag}</S.TagSpan>
          ))}
        </S.TagsDisplay>
      </S.FeedInfoTopContainer>
      <S.FeedCommentContainer>
        <S.FeedCommentSubject>
          {comments.map(({ username, content }, i) => (
            <S.UserWrapper key={i}>
              <S.UserIdSpan>{username}</S.UserIdSpan>
              <p>{content}</p>
            </S.UserWrapper>
          ))}
        </S.FeedCommentSubject>
      </S.FeedCommentContainer>
    </>
  );
};

export default FeedInfo;
