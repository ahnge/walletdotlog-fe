import React from "react";
import PasswordResetConfirm from "../components/passwordResetConfirmPage/PasswordResetConfirm";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PasswordResetConfirmPage = () => {
  const { authState } = useAuth();
  return (
    <div className="min-h-screen flex items-center px-8">
      {authState.user && <Navigate to="/" />}
      <PasswordResetConfirm />
    </div>
  );
};

export default PasswordResetConfirmPage;
