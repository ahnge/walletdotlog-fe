import React from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../components/loginPage/LoginForm";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { authState } = useAuth();

  return (
    <div className="min-h-screen flex items-center">
      {authState.user && <Navigate to="/" />}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
