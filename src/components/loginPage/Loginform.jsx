import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import Alert from "../Alert";

export function Loginform({ loadingExchangeToken }) {
  // local states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [fieldErr, setFieldErr] = useState([]);
  const [serverErr, setServerErr] = useState(false);

  // auth state
  const { authDispatch } = useAuth();

  // functions
  const handleSubmit = (e) => {
    e.preventDefault();
    const getTokens = async () => {
      setLoading(true);
      const res = await axios.post(
        "http://127.0.0.1:8000/dj-rest-auth/login/",
        {
          email,
          password,
        }
      );
      console.log(res);
      setSuccess(true);
      setTimeout(() => {
        setLoading(false);
        authDispatch({ type: "setInfos", payload: res.data });
        localStorage.setItem(
          "access_token",
          JSON.stringify(res.data.access_token)
        );
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(res.data.refresh_token)
        );
        setSuccess(false);
      }, 2000);
    };

    getTokens().catch((err) => {
      console.log("getTokens error:\t", err);
      if (err.response.data.non_field_errors) {
        setFieldErr(err.response.data.non_field_errors);
        setTimeout(() => setFieldErr([]), 3800);
      }
      if (err.response.status === 500) {
        setServerErr(true);
        setTimeout(() => setServerErr([]), 3800);
      }
    });

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="fixed top-20 right-10 w-fit transition duration-500 flex flex-col space-y-3">
        {fieldErr?.map((t, index) => {
          return <Alert text={t} type="error" key={index} />;
        })}
        {success && (
          <Alert text="Login success! Redirecting..." type="success" />
        )}
        {serverErr && (
          <Alert text="Internal server error! Try later..." type="error" />
        )}
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

          <div className="flex">
            {loadingExchangeToken || loading ? (
              <div className="traditional mt-1 mr-14"></div>
            ) : null}
            <input
              type="submit"
              value="Login"
              className={`btn ${
                loadingExchangeToken || loading ? "btn-disabled" : ""
              }`}
            />
          </div>
        </div>
      </form>
    </>
  );
}
