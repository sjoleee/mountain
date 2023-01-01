import React from "react";
import * as S from "@components/SideBarSection/styles";
import ProfileImage from "@components/common/ProfileImage";
import FeedImage from "@components/common/FeedImage";

const SideBarSection = ({ type, title, data, emptyContent, style }) => {
  return (
    <S.Section>
      <h3>{title}</h3>
      <S.List style={style}>
        {data?.length !== 0 ? (
          type === "info" ? (
            <S.InfoBox>
              <p className="desc">{data}</p>
            </S.InfoBox>
          ) : (
            data.map((item) =>
              type === "profile" ? (
                <ProfileImage
                  key={item._id}
                  profileImg={item.profileImg}
                  width="60px"
                  height="60px"
                />
              ) : (
                <FeedImage key={item._id} feedImg={item.feedImg} />
              )
            )
          )
        ) : (
          <span>{emptyContent}</span>
        )}
      </S.List>
    </S.Section>
  );
};

export default SideBarSection;
