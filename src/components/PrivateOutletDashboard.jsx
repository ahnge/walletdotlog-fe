import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { WalletProvider } from "../context/WalletContext";
import Aside from "./Aside";

const PrivateOutletDashboard = () => {
  const { authState } = useAuth();

  return authState.user ? (
    <WalletProvider>
      <div data-theme="cupcake">
        <Aside />
        <Outlet />
      </div>
    </WalletProvider>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateOutletDashboard;
