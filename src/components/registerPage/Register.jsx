import React, { useState } from "react";
import Google from "../svgs/Google";
import Github from "../svgs/Github";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useAxios from "../../hooks/useAxios";
import Alert from "../Alert";
import { useMutation } from "@tanstack/react-query";

function Register() {
  // auth states
  const { authDispatch } = useAuth();

  // local states
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const axiosInstance = useAxios();

  const registerUser = () => {
    return axiosInstance.post("dj-rest-auth/registration/", {
      email,
      full_name: fullName,
      password1,
      password2,
    });
  };

  const { mutate, isError, isSuccess, isLoading, error } = useMutation(
    registerUser,
    {
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
      onError: (err) => console.log(err),
      onSettled: () => {
        setEmail("");
        setFullName("");
        setPassword1("");
        setPassword2("");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  // variables
  const googleUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/login&prompt=consent&response_type=code&client_id=205634597669-0v561vtjjmevogap6rs9nd34dhcp5gna.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=online&state=google";
  const githubUrl =
    "https://github.com/login/oauth/authorize?redirect_uri=http://localhost:3000/login&client_id=99ac0be5f459199f2a82&scope=user&state=github";

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 font-inter">
      {/* Alerts */}
      {isError && (
        <Alert
          text={
            error.code === "ECONNABORTED"
              ? "Connection timeout"
              : error.response?.data?.email
              ? error.response.data.email[0]
              : error.response.data.non_field_errors
              ? error.response.data.non_field_errors[0]
              : error.response.statusText
          }
          type="error"
        />
      )}
      {isSuccess && (
        <Alert text="Registeration success! Loging in..." type="success" />
      )}
      {/* Alert end */}

      <div className="px-6 py-4">
        <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-center text-gray-600 dark:text-gray-200">
          Register
        </h3>
        {/* Social */}
        <div className="flex flex-col space-y-3 mt-5">
          <a
            className="btn w-full bg-white flex justify-center xs:justify-start"
            href={googleUrl}
            target="_self"
          >
            <Google />
            <span className=" ml-3 sm:ml-5 hidden xs:inline">
              Continue with Google
            </span>
          </a>
          <a
            className="btn w-full bg-white flex justify-center xs:justify-start"
            href={githubUrl}
            target="_self"
          >
            <Github />
            <span className=" ml-3 sm:ml-5 hidden xs:inline">
              Continue with Github
            </span>
          </a>
        </div>
        <div className="text-center py-3 font-bold">OR</div>
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
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
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
          <button
            type="submit"
            value="Login"
            className={`btn mt-4 ${isLoading ? "btn-disabled loading" : ""}`}
          >
            Register
          </button>
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
