import React, { useRef, useState } from "react";
import * as S from "./styles";
import { Portal } from "../FeedUploadModal";
import FeedInfo from "./FeedInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Feed = ({
  id,
  feedImg,
  content,
  profileImg,
  title,
  author,
  onLoad,
  comment,
  tag,
  likes,
  onClick,
}) => {
  const containerRef = useRef();
  const navigate = useNavigate();

  return (
    <>
      <S.FeedCardContainer ref={containerRef} onClick={() => onClick(id)}>
        <S.FeedCardImg
          src={feedImg}
          alt="피드 사진"
          onLoad={({ target }) => {
            containerRef.current.style.gridRowEnd = `span ${
              target.height + 23
            }`;
            setTimeout(() => {
              target.style.filter = "blur(0px)";
            }, 600);
            if (onLoad) {
              onLoad();
            }
          }}
        />
        <S.InfoContainer>
          <S.TitleContainer>
            <S.Title>{title}</S.Title>
          </S.TitleContainer>
        </S.InfoContainer>
      </S.FeedCardContainer>
    </>
  );
};

export default Feed;
