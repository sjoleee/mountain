import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAdmin = localStorage.getItem("userRole") === "admin";

  return isAdmin ? <Outlet /> : <Navigate to="/404" />;
};

export default ProtectedRoute;
