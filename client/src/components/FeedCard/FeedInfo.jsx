import React, { useEffect, useRef, useState } from "react";
import Tags from "../common/Tags";
import * as S from "./styles";
import { AiFillHeart, AiOutlineHeart, AiOutlineMore } from "react-icons/ai";
import axios from "axios";
import Button from "../common/Button";
import { useNavigate, Navigate } from "react-router-dom";

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
  refresh,
  handleModify,
}) => {
  const idRef = useRef();
  const inputRef = useRef();
  const [toggle, setToggle] = useState(true);
  const [btnToggle, setBtnToggle] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);
  const navigate = useNavigate();

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

    axios.put(
      `http://kdt-sw3-team03.elicecoding.com:5000/feeds/${_id}/like`,
      {},
      header
    );
  };

  const handleCommentSubmit = (feedId) => (e) => {
    e.preventDefault();
    const commentText = inputRef.current.value;
    const content = { contents: commentText };
    axios
      .post(
        `http://kdt-sw3-team03.elicecoding.com:5000/comments/${feedId}`,
        content,
        header
      )
      .then((res) => {
        axios
          .get(`http://kdt-sw3-team03.elicecoding.com:5000/feeds/${feedId}`)
          .then((res) => {
            setFeedEach(res.data);
          });
      });
    inputRef.current.value = "";
  };

  const handleDeleteFeed = () => {
    axios
      .delete(`http://kdt-sw3-team03.elicecoding.com:5000/feeds/${_id}`)
      .then(() => {
        navigate("/feeds", { replace: true });
        refresh();
      });
  };

  const handleModifyFeed = () => {
    handleModify();
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const isLiked = likes.includes(userId);
    if (isLiked) {
      setToggle(false);
    }
    if (author._id === userId) {
      setIsAuthor(true);
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
        {isAuthor && (
          <S.MoreBtnWrapper>
            <AiOutlineMore onClick={() => setBtnToggle(!btnToggle)} />
            {btnToggle && (
              <S.DropdownWrapper>
                <S.ButtonWrapper>
                  <Button
                    style={{ fontSize: "14px", margin: 0 }}
                    onClick={handleModifyFeed}
                  >
                    수정하기
                  </Button>
                </S.ButtonWrapper>
                <S.ButtonWrapper>
                  <Button
                    delete={true}
                    style={{
                      fontSize: "14px",
                      margin: 0,
                    }}
                    onClick={handleDeleteFeed}
                  >
                    삭제하기
                  </Button>
                </S.ButtonWrapper>
              </S.DropdownWrapper>
            )}
          </S.MoreBtnWrapper>
        )}
      </S.FeedInfoContainer>
    </>
  );
};

export default FeedInfo;
