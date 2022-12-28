import React from "react";
import * as S from "@components/SideBar/styles";

const SideBar = ({
  selectedMountain: { mntidetails, mntiname, users, posts },
}) => {
  return (
    <S.SideBarLayout>
      <S.SideBarBox>
        <S.InfoSection>
          <h3>소개글</h3>
          <S.InfoBox>
            {mntidetails ? (
              <p className="desc">{mntidetails}</p>
            ) : (
              <S.EmptyContent>소개글이 없어요.</S.EmptyContent>
            )}
          </S.InfoBox>
        </S.InfoSection>

        <S.ProfileSection>
          <h3>다녀간 대원들</h3>
          <S.ProfileList>
            {users?.length !== 0 ? (
              users?.map((visitor) => (
                <S.Profile key={visitor._id}>
                  <img src={visitor.profileImg} />
                </S.Profile>
              ))
            ) : (
              <S.EmptyContent>유저 정보가 없어요.</S.EmptyContent>
            )}
          </S.ProfileList>
        </S.ProfileSection>

        <S.PostSection>
          <h3>#{mntiname}</h3>
          <S.PostList>
            {posts?.length !== 0 ? (
              posts?.map((post) => (
                <S.PostBox key={post._id}>
                  <img src={post.feedImg} />
                </S.PostBox>
              ))
            ) : (
              <S.EmptyContent>게시글이 없어요.</S.EmptyContent>
            )}
          </S.PostList>
        </S.PostSection>
      </S.SideBarBox>
    </S.SideBarLayout>
  );
};

export default SideBar;
