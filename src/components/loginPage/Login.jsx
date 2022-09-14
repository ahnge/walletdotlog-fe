import { Loginform } from "./Loginform";
import React, { useEffect, useState } from "react";
import Google from "../svgs/Google";
import Github from "../svgs/Github";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Alert from "../Alert";

function Login() {
  // local states
  const [fieldErr, setFieldErr] = useState([]);
  const [loadingExchangeToken, setLoadingExchangeToken] = useState(false);
  const [successExchange, setSuccessExchange] = useState(false);

  // authState
  const { authDispatch } = useAuth();

  // variables
  const googleUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/login&prompt=consent&response_type=code&client_id=205634597669-0v561vtjjmevogap6rs9nd34dhcp5gna.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=online&state=google";
  const githubUrl =
    "https://github.com/login/oauth/authorize?redirect_uri=http://localhost:3000/login&client_id=99ac0be5f459199f2a82&scope=user&state=github";

  // useEffect
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("code")) {
      const postCode = async (state) => {
        setLoadingExchangeToken(true);
        const res = await axios.post(
          `http://localhost:8000/dj-rest-auth/${state}/`,
          {
            code: searchParams.get("code"),
          }
        );
        console.log(res);
        setSuccessExchange(true);
        setTimeout(() => {
          authDispatch({ type: "setInfos", payload: res.data });
          localStorage.setItem(
            "access_token",
            JSON.stringify(res.data.access_token)
          );
          localStorage.setItem(
            "refresh_token",
            JSON.stringify(res.data.refresh_token)
          );
          setSuccessExchange(false);
        }, 3000);
      };

      postCode(searchParams.get("state")).catch((err) => {
        console.log("postCodeErr", err);
        setLoadingExchangeToken(false);
        if (err.response.data.non_field_errors) {
          setFieldErr(err.response.data.non_field_errors);
          setTimeout(() => setFieldErr([]), 4000);
        }
      });
    }
  }, []);

  return (
    <>
      {/* Alert */}
      <div className="fixed top-20 right-10 w-fit transition duration-500 flex flex-col space-y-3">
        {fieldErr?.map((t, index) => {
          return <Alert text={t} type="error" key={index} />;
        })}
        {successExchange ? (
          <Alert text="Login success! Redirecting..." type="success" />
        ) : null}
      </div>

      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 font-inter">
        <div className="px-6 py-9">
          <h3 className="mt-1 text-3xl font-bold text-center text-gray-600 dark:text-gray-200">
            Login
          </h3>

          {/* Social */}
          <div className="flex flex-col space-y-3 mt-5">
            <a
              className="btn w-full bg-white flex justify-start"
              href={googleUrl}
              target="_self"
            >
              <Google />
              <span className=" ml-5">Continue with Google</span>
            </a>
            <a
              className="btn w-full bg-white flex justify-start"
              href={githubUrl}
              target="_self"
            >
              <Github />
              <span className=" ml-5">Continue with Github</span>
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
