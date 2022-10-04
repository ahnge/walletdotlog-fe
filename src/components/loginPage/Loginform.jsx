import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Alert from "../Alert";

export function Loginform({ loadingExchangeToken }) {
  // local states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // auth state
  const { authDispatch } = useAuth();

  const axiosInstance = useAxios();

  const login = () => {
    return axiosInstance.post("dj-rest-auth/login/", { email, password });
  };

  const { mutate, isLoading, isError, error, isSuccess } = useMutation(login, {
    onError: (error) => console.log("mutation err", error),
    onSuccess: (data) => {
      const access_token = data.data.access_token;
      const refresh_token = data.data.refresh_token;
      authDispatch({
        type: "setInfos",
        payload: { access_token, refresh_token },
      });
      localStorage.setItem("access_token", JSON.stringify(access_token));
      localStorage.setItem("refresh_token", JSON.stringify(refresh_token));
    },
    onSettled: () => {
      setEmail("");
      setPassword("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      <div className="fixed top-20 right-10 w-fit transition duration-500 flex flex-col space-y-3">
        {isError && (
          <Alert
            text={
              error.response.data.email
                ? error.response.data.email[0]
                : error.response.data.non_field_errors
                ? error.response.data.non_field_errors[0]
                : error.response.statusText
            }
            type="error"
          />
        )}
        {isSuccess && <Alert text="Success redirecting.." type="success" />}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="w-full mt-4">
          <input
            type="email"
            placeholder="Email Address"
            aria-label="Email Address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="input w-full"
          />
        </div>

        <div className="w-full mt-4">
          <input
            type="password"
            placeholder="Password"
            aria-label="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="input w-full"
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <Link
            to="/password/reset"
            className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
          >
            Forget Password?
          </Link>

          <button
            type="submit"
            value="Login"
            className={`btn ${
              loadingExchangeToken || isLoading ? "btn-disabled loading" : ""
            }`}
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
}
