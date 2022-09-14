import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";
import App from "./App";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PrivateOutlet from "./components/PrivateOutlet";
import ForgotPassPage from "./pages/ForgotPassPage";
import PasswordResetConfirmPage from "./pages/PasswordResetConfirmPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="/password/reset" element={<ForgotPassPage />}></Route>
          <Route
            path="/rest-auth/password/reset/confirm/:uid/:token"
            element={<PasswordResetConfirmPage />}
          ></Route>
          <Route
            path="/verify/email/:key"
            element={<VerifyEmailPage />}
          ></Route>
        </Route>
        <Route path="/dashboard" element={<PrivateOutlet />}>
          <Route index element={<DashboardPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
  // </React.StrictMode>
);
