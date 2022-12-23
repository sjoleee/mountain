import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

import * as S from "./styles";
import Feed from "@/components/common/Feed";
import FeedModal, { Portal } from "@/components/common/FeedModal";
import { useIntersect } from "@/hooks/useIntersect";

const FeedPage = () => {
  const [feeds, setFeeds] = useState([]);
  const [modalOn, setModalOn] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const ref = useIntersect(
    async (entry, observer) => {
      // observer.unobserve(entry.target);
      // if (hasNextPage && !isFetching) {
      // fetchNextPage();
      // }
      if (!loading) {
        setLoading(true);
        console.log("fetch");
        setLoading(false);
      }
    },
    { threshold: 0.1 }
  );

  const handleLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/feed-data");
      setFeeds(response.data);
    };
    getData();
  }, []);

  return (
    <>
      <S.GlobalStyle />
      <Portal>{modalOn && <FeedModal onClick={handleModal} />}</Portal>
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
          {/*intersectionObserver 이용해서 무한스크롤 구현 */}
          {!loading && <div ref={ref} style={{ height: 0 }}></div>}
        </S.FeedContainer>
      </S.PageLayout>
    </>
  );
};

export default FeedPage;
