import React, { useEffect, useRef, useState } from "react";
import Tags from "../common/Tags";
import * as S from "./styles";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

const FeedInfo = ({
  id,
  profileImg,
  author,
  content,
  comment,
  tag,
  likes,
  feedImg,
  setFeedEach,
}) => {
  const idRef = useRef();
  const inputRef = useRef();
  const [toggle, setToggle] = useState(true);

  const handleLikes = () => {
    setToggle(!toggle);

    // axios.put(`/feeds/${id}/like`);
  };

  const handleCommentSubmit = (feedId) => (e) => {
    e.preventDefault();
    const commentText = inputRef.current.value;
    const content = { contents: commentText };
    setFeedEach((prev) => {
      return {
        ...prev,
        comment: [
          ...prev.comment,
          { username: "테스트유저입니다.", ...content },
        ],
      };
    });
    inputRef.current.value = "";
    // axios.post(`/comments/${feedId}`, content);
  };

  return (
    <>
      <S.ImgContainer>
        <S.FeedImg src={feedImg} />
      </S.ImgContainer>
      <S.FeedInfoContainer>
        <S.FeedInfoTopContainer>
          <S.UserProfileContainer>
            <S.UserProfileImg src={profileImg} alt="유저 프로필이미지" />
            <S.UserName>{author}</S.UserName>
          </S.UserProfileContainer>
          <S.ContentWrapper>
            <S.FeedContent>{content}</S.FeedContent>
          </S.ContentWrapper>
          <S.TagsDisplay>
            {tag?.map((tagEach) => (
              <S.TagSpan>#{tagEach.tag}</S.TagSpan>
            ))}
          </S.TagsDisplay>
        </S.FeedInfoTopContainer>
        <S.FeedCommentContainer>
          <S.FeedCommentSubject>
            {comment?.map(({ username, contents }, i) => (
              <S.UserWrapper key={i}>
                <S.UserIdSpan>{username}</S.UserIdSpan>
                <p>{contents}</p>
              </S.UserWrapper>
            ))}
          </S.FeedCommentSubject>
        </S.FeedCommentContainer>
        <S.CommentInputWrapper>
          <S.CommentInputForm onSubmit={handleCommentSubmit(id)}>
            <S.CommentInput placeholder="댓글을 입력해주세요" ref={inputRef} />
            <S.CommentInputBtn>댓글달기</S.CommentInputBtn>
          </S.CommentInputForm>
        </S.CommentInputWrapper>
        <S.LikesWrapper>
          <S.LikesBtn onClick={handleLikes}>
            {!toggle ? <AiFillHeart /> : <AiOutlineHeart />}
          </S.LikesBtn>
          <S.LikesCount>{likes?.length}</S.LikesCount>
        </S.LikesWrapper>
      </S.FeedInfoContainer>
    </>
  );
};

export default FeedInfo;
