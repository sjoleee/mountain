import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import * as S from "./styles";
import axios from "axios";
import AdminPost from "../../components/AdminPost";
import { getAdminData } from "../../apis";

export const TAB = {
  CHALLENGES: "challenges",
  FEEDS: "feeds",
  USERS: "users",
};

const AdminPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(() => {
    if (searchParams.get("page")) return Number(searchParams.get("page"));
    else {
      return 1;
    }
  });

  const validateTab = {
    isChallenges: searchParams.get("tab") === TAB.CHALLENGES,
    isFeeds: searchParams.get("tab") === TAB.FEEDS,
    isUsers: searchParams.get("tab") === TAB.USERS,
  };

  const { data, isLoading, isError } = useQuery(
    ["posts", searchParams.get("tab"), currentPage],
    () => getAdminData(searchParams.get("tab"), currentPage),
    {
      staleTime: 2000,
    }
  );

  useEffect(() => {
    if (!searchParams.get("tab") && !searchParams.get("page"))
      setSearchParams({ tab: TAB.CHALLENGES, page: 1 });
  }, []);

  return (
    <S.Container>
      <h1>ADMIN</h1>
      <S.TabContainer>
        <S.Tab
          onClick={() => {
            setCurrentPage(1);
            setSearchParams({ tab: TAB.CHALLENGES, page: 1 });
          }}
          isSelected={validateTab.isChallenges}
        >
          챌린지
        </S.Tab>
        <S.Tab
          onClick={() => {
            setCurrentPage(1);
            setSearchParams({ tab: TAB.FEEDS, page: 1 });
          }}
          isSelected={validateTab.isFeeds}
        >
          피드
        </S.Tab>
        <S.Tab
          onClick={() => {
            setCurrentPage(1);
            setSearchParams({ tab: TAB.USERS, page: 1 });
          }}
          isSelected={validateTab.isUsers}
        >
          유저
        </S.Tab>
      </S.TabContainer>
      <S.Board>
        <S.BoardTitleContainer>
          <S.BoardTitle>ID</S.BoardTitle>
          <S.BoardTitle isTitle>이름</S.BoardTitle>
          <S.BoardTitle>생성일자</S.BoardTitle>
          <S.BoardTitle isButton isChallenges={validateTab.isChallenges}>
            편집
          </S.BoardTitle>
        </S.BoardTitleContainer>
        {data?.data.map((post) => (
          <AdminPost key={post._id} validateTab={validateTab} {...post} />
        ))}
        <S.PageController>
          <S.Button
            disabled={!data?.meta.hasPreviousPage}
            onClick={() => {
              setCurrentPage((prev) => prev - 1);
              setSearchParams({
                tab: searchParams.get("tab"),
                page: currentPage - 1,
              });
            }}
          >
            이전
          </S.Button>
          <span>Page {currentPage}</span>
          <S.Button
            disabled={!data?.meta.hasNextPage}
            onClick={() => {
              setCurrentPage((prev) => prev + 1);
              setSearchParams({
                tab: searchParams.get("tab"),
                page: currentPage + 1,
              });
            }}
          >
            다음
          </S.Button>
        </S.PageController>
      </S.Board>
    </S.Container>
  );
};

export default AdminPage;
