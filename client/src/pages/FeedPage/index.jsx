import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as S from "./styles";
import Feed from "@/components/FeedCard";
import FeedModal, { Portal } from "@/components/FeedModal";
import { useIntersect } from "@/hooks/useIntersect";
import { useRecoilState } from "recoil";
import { ModalOn } from "@/store";

const FeedPage = () => {
  const [feeds, setFeeds] = useState([]);
  const [modalOn, setModalOn] = useRecoilState(ModalOn);
  const [loading, setLoading] = useState(true);

  const handleModal = () => {
    setModalOn(!modalOn);
  };
  const ref = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);
      if (!loading) {
        setLoading(true);
        console.log("fetch");
        axios.get("/feed-data").then((res) => {
          setFeeds((prev) => [...prev, ...res.data]);
          setLoading(false);
        });
      }
    },
    { threshold: 0.1 }
  );

  const handleLoad = () => {
    setLoading(false);
  };

  const getData = async () => {
    const response = await axios.get("/feed-data");
    setFeeds(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <S.GlobalStyle />
      <Portal>
        {modalOn && <FeedModal onClick={handleModal} getData={getData} />}
      </Portal>
      <S.SearchBarContainer>
        <S.PostButtonContainer>
          <S.PostButtonSpan className="mas">게시글 작성</S.PostButtonSpan>
          <S.PostButton type="button" name="Hover" onClick={handleModal}>
            게시글 작성
          </S.PostButton>
        </S.PostButtonContainer>
        <S.SearchInputWrapper>
          <S.SearchInput type="text" placeholder="검색어를 입력해주세요." />
        </S.SearchInputWrapper>
      </S.SearchBarContainer>
      <S.PageLayout>
        <S.FeedContainer>
          {feeds.map((feed, i) => (
            <Feed
              key={feed.id}
              {...feed}
              onLoad={i === feeds.length - 1 ? handleLoad : null}
            />
          ))}
          {!loading && <div ref={ref} style={{ height: 0 }}></div>}
        </S.FeedContainer>
      </S.PageLayout>
    </>
  );
};

export default FeedPage;
