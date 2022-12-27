import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as S from "./styles";
import Feed from "@/components/FeedCard";
import FeedInfo from "@/components/FeedCard/FeedInfo";
import FeedModal, { Portal } from "@/components/FeedUploadModal";
import { useIntersect } from "@/hooks/useIntersect";
import { useRecoilState } from "recoil";
import { ModalOn } from "@/store";
import { useNavigate, useSearchParams } from "react-router-dom";

const FeedPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [feeds, setFeeds] = useState([]);
  const [feedEach, setFeedEach] = useState({});
  const [modalOn, setModalOn] = useRecoilState(ModalOn);
  const [loading, setLoading] = useState(true);
  const [cardOpen, setCardOpen] = useState(false);
  const navigate = useNavigate();

  const handleModal = () => {
    setModalOn(!modalOn);
  };

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (!loading) {
      setLoading(true);
      console.log("fetch");
      axios.get("/feed-data").then((res) => {
        setFeeds([...feeds, ...res.data]);
        setLoading(false);
      });
    }
  });

  const handleLoad = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const getData = () => {
    axios.get("/feed-data").then((res) => {
      setFeeds([...res.data]);
      console.log(res.data);
    });
  };

  const handleCardOpen = (id) => {
    navigate(`/feeds?feed-id=${id}`);
    axios.get(`/feed-data?feed-id=${id}`).then((res) => {
      setFeedEach(res.data);
      setCardOpen(true);
    });
  };

  const getFeedDataById = (id) => {
    axios.get(`/feed-data?feed-id=${id}`).then((res) => {
      setFeedEach(res.data);
      setCardOpen(true);
    });
  };

  useEffect(() => {
    getData();
    const feedId = searchParams.get("feed-id");
    if (feedId) {
      getFeedDataById(feedId);
    }
  }, []);

  return (
    <>
      <S.GlobalStyle />
      <Portal>
        {modalOn && (
          <FeedModal
            onClick={handleModal}
            getData={getData}
            setFeeds={setFeeds}
          />
        )}
        {cardOpen && (
          <S.CardDetailContainer>
            <S.CloseContainer
              onClick={() => {
                navigate("/feeds");
                setCardOpen(false);
              }}
            />
            <S.CardDetail>
              <FeedInfo {...feedEach} setFeedEach={setFeedEach} />
            </S.CardDetail>
          </S.CardDetailContainer>
        )}
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
              id={feed.id}
              {...feed}
              onLoad={i === feeds.length - 1 ? handleLoad : null}
              onClick={handleCardOpen}
            />
          ))}
          {!loading && <div ref={ref} style={{ height: 0 }}></div>}
        </S.FeedContainer>
      </S.PageLayout>
    </>
  );
};

export default FeedPage;
