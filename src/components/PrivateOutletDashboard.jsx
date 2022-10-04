import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Aside from "./Aside";

const PrivateOutletDashboard = () => {
  const { authState } = useAuth();

  return authState.user ? (
    <div data-theme="cupcake">
      <Aside />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateOutletDashboard;
