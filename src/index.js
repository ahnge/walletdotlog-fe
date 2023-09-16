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
import ForgotPassPage from "./pages/ForgotPassPage";
import PasswordResetConfirmPage from "./pages/PasswordResetConfirmPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import LogsPage from "./pages/LogsPage";
import PolicyPage from "./pages/PolicyPage";
import PrivateOutletDashboard from "./components/PrivateOutletDashboard";
import { GlobalProvider } from "./context/GlobalContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SettingsPage from "./pages/SettingsPage";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route path="/policy" element={<PolicyPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route
                path="/password/reset"
                element={<ForgotPassPage />}
              ></Route>
              <Route
                path="/rest-auth/password/reset/confirm/:uid/:token"
                element={<PasswordResetConfirmPage />}
              ></Route>
              <Route
                path="/verify/email/:key"
                element={<VerifyEmailPage />}
              ></Route>
            </Route>
            <Route path="/dashboard" element={<PrivateOutletDashboard />}>
              <Route index element={<DashboardPage />}></Route>
              <Route path="logs" element={<LogsPage />}></Route>
              <Route path="settings" element={<SettingsPage />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </AuthProvider>
  </QueryClientProvider>
  // </React.StrictMode>
);
