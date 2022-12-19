import React, { useEffect } from "react";
import styled from "styled-components";
import { testData } from "@/states";
import { useRecoilValue } from "recoil";
import Feed from "@/components/common/Feed";

const FeedPage = () => {
  const feeds = useRecoilValue(testData);
  console.log(feeds);

  return (
    <PageLayout>
      <SearchBarContainer>
        <PostButton>게시글 작성</PostButton>
        <SearchInput type="text" placeholder="검색어를 입력해주세요." />
      </SearchBarContainer>
      <FeedContainer>
        {feeds.map((feed) => (
          <Feed key={feed.id} {...feed} />
        ))}
      </FeedContainer>
    </PageLayout>
  );
};

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostButton = styled.button`
  font-size: 12px;
`;

const SearchInput = styled.input`
  height: 24px;
`;

const FeedContainer = styled.div`
  display: flex;
`;

export default FeedPage;
