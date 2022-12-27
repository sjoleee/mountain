import React from "react";
import * as S from "@components/SideBar/styles";

const SideBar = ({ selectedMountain }) => {
  return (
    selectedMountain && (
      <S.SideBarLayout>
        <S.SideBarBox>
          <S.ProfileSection>
            <h3>다녀간 대원들</h3>
            <S.ProfileList>
              {selectedMountain.visitors?.map((visitor) => (
                <S.Profile key={visitor.id}>
                  <img src={visitor.img} />
                </S.Profile>
              ))}
            </S.ProfileList>
          </S.ProfileSection>
          <S.PostSection>
            <h3>#{selectedMountain.mntiname}</h3>
            <S.PostList>
              {selectedMountain.posts?.map((post) => (
                <S.PostBox key={post.id}>
                  <img src={post.img} />
                </S.PostBox>
              ))}
            </S.PostList>
          </S.PostSection>
        </S.SideBarBox>
      </S.SideBarLayout>
    )
  );
};

export default SideBar;
