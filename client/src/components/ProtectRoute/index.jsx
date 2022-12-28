import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginState } from "../../store/userState";

const ProtectRoute = () => {
  const isLogin = useRecoilValue(isLoginState);

  return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectRoute;
