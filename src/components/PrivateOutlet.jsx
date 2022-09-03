import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateOutlet = () => {
  const { authState } = useAuth();

  return authState.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateOutlet;
