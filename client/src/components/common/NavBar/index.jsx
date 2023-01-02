import React from "react";
import { isLoginState } from "../../../store/userState";
import { useRecoilValue } from "recoil";
import * as S from "@components/common/NavBar/styles";

const NavBar = () => {
  const isLogin = useRecoilValue(isLoginState);

  return (
    <S.NavBarLayout>
      <S.NavBarList>
        <S.NavBarItem>
          <S.StyledNavLink to="/">Home</S.StyledNavLink>
        </S.NavBarItem>
        <S.NavBarItem>
          <S.StyledNavLink to="/feeds">Feed</S.StyledNavLink>
        </S.NavBarItem>
        <S.NavBarItem>
          <S.StyledNavLink to="/map">Map</S.StyledNavLink>
        </S.NavBarItem>
        <S.NavBarItem>
          <S.StyledNavLink to="/challenge">Challenge</S.StyledNavLink>
        </S.NavBarItem>
        <S.NavBarItem>
          <S.StyledNavLink to="/ranking">Ranking</S.StyledNavLink>
        </S.NavBarItem>
        <S.NavBarItem>
          {isLogin ? (
            <S.StyledNavLink to="/user">Mypage</S.StyledNavLink>
          ) : (
            <S.StyledNavLink to="/login">Login</S.StyledNavLink>
          )}
        </S.NavBarItem>
      </S.NavBarList>
    </S.NavBarLayout>
  );
};

export default NavBar;
