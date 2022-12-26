import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import * as S from "./styles";
import axios from "axios";
import AdminPost from "../../components/AdminPost";

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

  const getAdminData = async (page) => {
    try {
      const response = await axios({
        method: "get",
        url: `http://localhost:8000/admin/${searchParams.get("tab")}`,
        params: { order: "desc", page: page, take: 10 },
        headers: { contentType: "application/json" },
      });

      return response.data;
    } catch (error) {
      console.dir(error);
    }
  };

  const { data, isLoading, isError } = useQuery(
    ["posts", searchParams.get("tab"), currentPage],
    () => getAdminData(currentPage),
    {
      staleTime: 2000,
    }
  );

  console.log(data);

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
        >
          챌린지
        </S.Tab>
        <S.Tab
          onClick={() => {
            setCurrentPage(1);
            setSearchParams({ tab: TAB.FEEDS, page: 1 });
          }}
        >
          피드
        </S.Tab>
        <S.Tab
          onClick={() => {
            setCurrentPage(1);
            setSearchParams({ tab: TAB.USERS, page: 1 });
          }}
        >
          유저
        </S.Tab>
      </S.TabContainer>
      <S.Board>
        {data?.data.map((post) => (
          <AdminPost key={post._id} validateTab={validateTab} {...post} />
        ))}
        <S.PageController>
          <button
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
          </button>
          <span>Page {currentPage}</span>
          <button
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
          </button>
        </S.PageController>
      </S.Board>
    </S.Container>
  );
};

export default AdminPage;
