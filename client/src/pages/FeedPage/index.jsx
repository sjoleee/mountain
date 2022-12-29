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

let timer;
function debounce(cb, delay) {
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    cb();
  }, delay);
}

const FeedPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [feeds, setFeeds] = useState([]);
  const [feedEach, setFeedEach] = useState({});
  const [modalOn, setModalOn] = useRecoilState(ModalOn);
  const [loading, setLoading] = useState(true);
  const [cardOpen, setCardOpen] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [modifyMode, setModifyMode] = useState(false);
  const [pageCount, setPageCount] = useState(2);
  const takePage = useRef(25);
  const navigate = useNavigate();
  const feedId = searchParams.get("feed-id");
  const author = searchParams.get("author");

  const handleModal = () => {
    setModalOn(!modalOn);
    setModifyMode(false);
  };

  const ref = useIntersect((entry, observer) => {
    observer.unobserve(entry.target);
    if (!loading && hasNext) {
      if (author && hasNext) {
        return axios
          .get(
            `http://kdt-sw3-team03.elicecoding.com:5000/feeds?author=${author}&page=${pageCount}&take=25`
          )
          .then((res) => {
            setFeeds([...feeds, ...res.data.data]);
            setHasNext(res.data.meta.hasNextPage);
            setPageCount(pageCount + 1);
            setLoading(false);
          });
      }
      setLoading(true);
      console.log("fetch");
      axios
        .get(
          `http://kdt-sw3-team03.elicecoding.com:5000/feeds?page=${pageCount}&take=${takePage.current}`
        )
        .then((res) => {
          setFeeds([...feeds, ...res.data.data]);
          setHasNext(res.data.meta.hasNextPage);
          setPageCount(pageCount + 1);
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
    axios
      .get(
        `http://kdt-sw3-team03.elicecoding.com:5000/feeds?pos=false&like=false&order=desc&page=1&take=${takePage.current}`
      )
      .then((res) => {
        setFeeds(res.data.data);
        setHasNext(res.data.meta.hasNextPage);
      });
  };

  const getFeedDataById = (id) => {
    axios
      .get(`http://kdt-sw3-team03.elicecoding.com:5000/feeds/${id}`)
      .then((res) => {
        setFeedEach(res.data);
        setCardOpen(true);
      });
  };

  const getFeedDataByAuthor = (author) => {
    axios
      .get(
        `http://kdt-sw3-team03.elicecoding.com:5000/feeds?author=${author}&take=25`
      )
      .then((res) => {
        setFeeds(res.data.data);
        setHasNext(res.data.meta.hasNextPage);
      });
  };

  const handleCardOpen = (id) => {
    navigate(`/feeds?feed-id=${id}`);
    getFeedDataById(id);
  };

  const handleSearch = ({ target }) => {
    console.log(target.value);
    // 디바운싱 적용해서 검색기능 적용할 것
    debounce(() => {
      axios
        .get(
          `http://kdt-sw3-team03.elicecoding.com:5000/feeds?tag=${target.value}&take=20`
        )
        .then((res) => {
          setFeeds(res.data.data);
        });
    }, 600);
  };

  const handleDelete = () => {
    setCardOpen(false);
    getData();
  };

  const handleModify = () => {
    setCardOpen(false);
    setModifyMode(true);
    setModalOn(true);
  };

  useEffect(() => {
    getData();

    if (feedId && !modifyMode) {
      getFeedDataById(feedId);
    }
    if (author && !modifyMode) {
      getFeedDataByAuthor(author);
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
            modifyMode={modifyMode}
            feedEach={modifyMode ? feedEach : null}
            setModifyMode={setModifyMode}
          />
        )}
        {cardOpen && (
          <S.CardDetailContainer>
            <S.CloseContainer
              onClick={() => {
                navigate(-1);
                setCardOpen(false);
              }}
            />
            <S.CardDetail>
              <FeedInfo
                {...feedEach}
                setFeedEach={setFeedEach}
                refresh={handleDelete}
                handleModify={handleModify}
              />
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
          <S.SearchInput
            type="text"
            placeholder="검색어를 입력해주세요."
            onChange={handleSearch}
          />
        </S.SearchInputWrapper>
      </S.SearchBarContainer>
      <S.PageLayout>
        <S.FeedContainer>
          {feeds.map((feed, i) => (
            <Feed
              key={feed._id}
              id={feed._id}
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
