import React, { useEffect, useRef, useState } from "react";
import Tags from "../common/Tags";
import * as S from "./styles";
import { AiFillHeart, AiOutlineHeart, AiOutlineMore } from "react-icons/ai";
import axios from "axios";

const FeedInfo = ({
  _id,
  profileImg,
  author,
  content,
  comments,
  tag,
  likes,
  feedImg,
  setFeedEach,
}) => {
  const idRef = useRef();
  const inputRef = useRef();
  const [toggle, setToggle] = useState(true);
  const [likesCount, setLikesCount] = useState(likes.length);
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };

  const handleLikes = () => {
    if (likesCount > 0 && !toggle) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setToggle(!toggle);

    axios.put(`http://localhost:8000/feeds/${_id}/like`, {}, header);
  };

  const handleCommentSubmit = (feedId) => (e) => {
    e.preventDefault();
    const commentText = inputRef.current.value;
    const content = { contents: commentText };
    axios
      .post(`http://localhost:8000/comments/${feedId}`, content, header)
      .then((res) => {
        setFeedEach((prev) => {
          console.log(res, prev);
          return {
            ...prev,
            comments: [...prev.comments, res.data],
          };
        });
      });
    inputRef.current.value = "";
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const isLiked = likes.includes(userId);
    if (isLiked) {
      setToggle(false);
    }
  }, []);

  return (
    <>
      <S.ImgContainer>
        <S.FeedImg src={feedImg} />
      </S.ImgContainer>
      <S.FeedInfoContainer>
        <S.FeedInfoTopContainer>
          <S.UserProfileContainer>
            <S.UserProfileImg src={author.profileImg} alt="유저 프로필이미지" />
            <S.UserName>{author.username}</S.UserName>
          </S.UserProfileContainer>
          <S.ContentWrapper>
            <S.FeedContent>{content}</S.FeedContent>
          </S.ContentWrapper>
          <S.TagsDisplay>
            {tag?.map((tagEach, i) => (
              <S.TagSpan key={i}>#{tagEach}</S.TagSpan>
            ))}
          </S.TagsDisplay>
        </S.FeedInfoTopContainer>
        <S.FeedCommentContainer>
          <S.FeedCommentSubject>
            {comments?.map(({ author, contents }, i) => (
              <S.UserWrapper key={i}>
                <S.UserIdSpan>{author.username}</S.UserIdSpan>
                <p>{contents}</p>
              </S.UserWrapper>
            ))}
          </S.FeedCommentSubject>
        </S.FeedCommentContainer>
        <S.CommentInputWrapper>
          <S.CommentInputForm onSubmit={handleCommentSubmit(_id)}>
            <S.CommentInput placeholder="댓글을 입력해주세요" ref={inputRef} />
            <S.CommentInputBtn>댓글달기</S.CommentInputBtn>
          </S.CommentInputForm>
        </S.CommentInputWrapper>
        <S.LikesWrapper>
          <S.LikesBtn onClick={handleLikes}>
            {!toggle ? <AiFillHeart /> : <AiOutlineHeart />}
          </S.LikesBtn>
          <S.LikesCount>{likesCount}</S.LikesCount>
        </S.LikesWrapper>
        <S.MoreBtnWrapper>
          <AiOutlineMore />
        </S.MoreBtnWrapper>
      </S.FeedInfoContainer>
    </>
  );
};

export default FeedInfo;
