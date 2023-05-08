import { Loginform } from "./Loginform";
import React, { useEffect } from "react";
import Google from "../svgs/Google";
import Github from "../svgs/Github";
import { Link, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import useAxios from "../../hooks/useAxios";
import Alert from "../Alert";

function Login() {
  let [searchParams, setSearchParams] = useSearchParams();
  // authState
  const { authDispatch } = useAuth();

  const axiosInstance = useAxios();

  const {
    mutate,
    isLoading: loadingExchangeToken,
    isError,
    isSuccess,
    error,
  } = useMutation(
    (state) =>
      axiosInstance.post(`dj-rest-auth/${state}/`, {
        code: searchParams.get("code"),
      }),
    {
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
    }
  );

  // variables
  const googleUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=https://walletdotlog.site/login&prompt=consent&response_type=code&client_id=205634597669-0v561vtjjmevogap6rs9nd34dhcp5gna.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=online&state=google";
  const githubUrl =
    "https://github.com/login/oauth/authorize?redirect_uri=https://walletdotlog.site/login&client_id=99ac0be5f459199f2a82&scope=user&state=github";

  // useEffect
  useEffect(() => {
    if (searchParams.get("code")) {
      mutate(searchParams.get("state"));
    }
  }, []);

  return (
    <>
      {/* Alert */}
      {isError && (
        <Alert
          text={
            error.response.data.non_field_errors
              ? error.response.data.non_field_errors[0]
              : error.response.statusText
              ? error.response.statusText
              : "Something went wrong. Please try later."
          }
          type="error"
        />
      )}
      {isSuccess && <Alert text="Success redirecting.." type="success" />}

      <div className="w-full max-w-sm mx-auto mt-10 sm:mt-0 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 font-inter">
        <div className="px-6 py-9">
          <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-center text-gray-600 dark:text-gray-200">
            Login
          </h3>

          {/* Social */}
          <div className="flex flex-col space-y-3 mt-5">
            <a
              className={`btn w-full bg-white flex justify-center xs:justify-start ${
                loadingExchangeToken ? "btn-disabled " : ""
              }`}
              href={googleUrl}
              target="_self"
            >
              <Google />
              <span className=" ml-3 sm:ml-5 hidden xs:inline">
                Continue with Google
              </span>
            </a>
            <a
              className={`btn w-full bg-white flex justify-center xs:justify-start ${
                loadingExchangeToken ? "btn-disabled" : ""
              }`}
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
          <Loginform loadingExchangeToken={loadingExchangeToken} />
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
    </>
  );
}

export default Login;
