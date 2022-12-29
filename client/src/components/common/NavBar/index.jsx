import React from "react";
import { Link } from "react-router-dom";
import { isLoginState } from "../../../store/userState";
import { useRecoilValue } from "recoil";

const NavBar = () => {
  const isLogin = useRecoilValue(isLoginState);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/feeds">Feed</Link>
        </li>
        <li>
          <Link to="/map">Map</Link>
        </li>
        <li>
          <Link to="/challenge">Challenge</Link>
        </li>
        <li>
          <Link to="/ranking">Ranking</Link>
        </li>
        <li>
          {isLogin ? (
            <Link to="/mypage">Mypage</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
