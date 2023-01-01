import React from "react";
import * as S from "@components/SideBar/styles";
import SideBarSection from "@components/SideBarSection";

const ProfileListStyleProps = {
  height: "175px",
};

const FeedListStyleProps = {
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  height: "270px",
  gap: "2px",
  overflow: "scroll",
};

const SideBar = ({
  selectedMountain: { mntidetails, mntiname, users, feeds },
}) => {
  return (
    <S.SideBarLayout>
      <S.SideBarBox>
        <SideBarSection
          type="info"
          title="소개글"
          data={mntidetails}
          emptyContent="소개글이 없어요"
        />
        <SideBarSection
          type="profile"
          title="다녀간 대원들"
          data={users}
          emptyContent="유저 정보가 없어요"
          style={ProfileListStyleProps}
        />
        <SideBarSection
          type="feed"
          title={mntiname}
          data={feeds}
          emptyContent="게시글이 없어요"
          style={FeedListStyleProps}
        />
      </S.SideBarBox>
    </S.SideBarLayout>
  );
};

export default SideBar;
