import React, { useState } from "react";
import Logo from "../svgs/Logo";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "./Alert";

function LoginForm() {
  // local states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPass, setErrorPass] = useState(false);

  const [errorText, setErrorText] = useState("");

  // auth state
  const { authState, authDispatch } = useAuth();

  // react-router-dom
  const navigate = useNavigate();

  // functions
  const handleSubmit = (e) => {
    e.preventDefault();
    const getTokens = async () => {
      const res = await axios.post("http://127.0.0.1:8000/api/token/", {
        email,
        password,
      });
      console.log(res);
      if (res.statusText === "OK") {
        authDispatch({ type: "setTokens", payload: res.data });
        localStorage.setItem("authTokens", JSON.stringify(res.data));
        navigate("/");
      }
    };
    getTokens().catch((err) => {
      setErrorEmail(true);
      setErrorPass(true);
      setErrorText(err.response.data.detail);
      setTimeout(() => setErrorText(""), 3800);
      console.log(err);
    });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 font-inter">
      <Alert text={errorText} />
      <div className="px-6 py-9">
        <div className=" flex justify-center">
          <Logo />
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
          Welcome Back
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-4">
            <input
              type="email"
              placeholder="Email Address"
              aria-label="Email Address"
              value={email}
              required
              onFocus={() => setErrorEmail(false)}
              onChange={(e) => setEmail(e.target.value)}
              className={`input w-full ${errorEmail ? "input-error" : ""}`}
            />
          </div>

          <div className="w-full mt-4">
            <input
              type="password"
              placeholder="Password"
              aria-label="Password"
              value={password}
              required
              onFocus={() => setErrorPass(false)}
              onChange={(e) => setPassword(e.target.value)}
              className={`input w-full ${errorPass ? "input-error" : ""}`}
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
            >
              Forget Password?
            </a>

            <input type="submit" value="Login" className="btn" />
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-200">
          Don't have an account?{" "}
        </span>

        <Link
          to={"/register"}
          className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
