import React from "react";
import { Navigate } from "react-router-dom";
import Login from "../components/loginPage/Login";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { authState } = useAuth();

  return (
    <div className="min-h-screen flex items-center px-8">
      {authState.user && <Navigate to="/" />}
      <Login />
    </div>
  );
};

export default LoginPage;
