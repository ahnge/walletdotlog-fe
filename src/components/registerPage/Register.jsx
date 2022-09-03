import React, { useState } from "react";
import Logo from "../svgs/Logo";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Alert from "./Alert";

function Register() {
  // auth states
  const { authDispatch } = useAuth();

  // local states
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [emailErr, setEmailErr] = useState([]);
  const [passErr, setPassErr] = useState([]);

  // react-router-dom
  const navigate = useNavigate();

  // functions
  const getTokens = async (em, pas) => {
    const res = await axios.post("http://127.0.0.1:8000/api/token/", {
      email: em,
      password: pas,
    });
    console.log(res);
    if (res.statusText === "OK") {
      authDispatch({ type: "setTokens", payload: res.data });
      localStorage.setItem("authTokens", JSON.stringify(res.data));
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registerUser = async () => {
      const data = { email, full_name: fullName, password, password2 };
      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        data
      );
      console.log("register res", res);
      if (res.status === 201) {
        getTokens(email, password).catch((err) => {
          console.log(err);
        });
        setEmail("");
        setFullName("");
        setPassword("");
        setPassword2("");
      }
    };
    registerUser().catch((err) => {
      console.log("err", err);
      if (err.response.data.email) {
        setEmailErr(err.response.data.email);
        setTimeout(() => setEmailErr([]), 3800);
      }
      if (err.response.data.password) {
        setPassErr(err.response.data.password);
        setTimeout(() => setPassErr([]), 3800);
      }
      setEmail("");
      setFullName("");
      setPassword("");
      setPassword2("");
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 font-inter">
      <div className="absolute top-20 right-10 w-fit transition duration-500 flex flex-col space-y- ">
        {emailErr?.map((t) => {
          return <Alert text={t} type="warning" />;
        })}
        {passErr?.map((t) => {
          return <Alert text={t} type="warning" />;
        })}
      </div>
      <div className="px-6 py-4">
        <div className=" flex justify-center">
          <Logo />
        </div>

        <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
          Register account.
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="w-full mt-4">
            <input
              className="input w-full"
              type="email"
              value={email}
              placeholder="Email Address"
              aria-label="Email Address"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-full mt-4">
            <input
              type="text"
              name="name"
              value={fullName}
              placeholder="Full name"
              className="input w-full"
              aria-label="Full Name"
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="w-full mt-4">
            <input
              className="input w-full"
              type="password"
              name="password"
              placeholder="Password"
              aria-label="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="w-full mt-4">
            <input
              className="input w-full"
              type="password"
              name="password2"
              placeholder="Confirm Password"
              aria-label="Password"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-start mt-4">
            <input type="submit" value="Reggister" className="btn" />
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-200">
          Already have an account?{" "}
        </span>

        <Link
          to="/login"
          className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
