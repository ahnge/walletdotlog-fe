import React from "react";
import Dashboard from "../components/dashboardPage/Dashboard";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  const { authState } = useAuth();
  return (
    <div data-theme="cupcake">
      {!authState.user && <Navigate to="/" />}
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
