import React from "react";
import Register from "../components/registerPage/Register";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const { authState } = useAuth();
  return (
    <div className="min-h-screen flex items-center">
      {authState.user && <Navigate to="/" />}
      <Register />
    </div>
  );
};

export default RegisterPage;
