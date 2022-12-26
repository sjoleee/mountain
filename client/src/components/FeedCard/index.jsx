import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { ModalOn } from "@/store";
import * as S from "./styles";
import { Portal } from "../FeedModal";
import FeedInfo from "./FeedInfo";

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
}) => {
  const containerRef = useRef();
  const [modalOn, setModalOn] = useRecoilState(ModalOn);
  const [cardOn, setCardOn] = useState(false);

  return (
    <>
      {cardOn && (
        <Portal>
          <S.CardDetailContainer>
            <S.CloseContainer onClick={() => setCardOn(false)} />
            <S.CardDetail>
              <S.ImgContainer>
                <S.FeedImg src={feedImg} />
              </S.ImgContainer>
              <S.FeedInfoContainer>
                <FeedInfo
                  profileImg={profileImg}
                  author={author}
                  content={content}
                  comments={comment}
                  tags={tag}
                />
              </S.FeedInfoContainer>
            </S.CardDetail>
          </S.CardDetailContainer>
        </Portal>
      )}
      <S.FeedCardContainer
        ref={containerRef}
        onClick={() => setCardOn(!cardOn)}
      >
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
