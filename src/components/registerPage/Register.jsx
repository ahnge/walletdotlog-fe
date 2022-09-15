import React, { useState } from "react";
import Google from "../svgs/Google";
import Github from "../svgs/Github";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Alert from "../Alert";

function Register() {
  // auth states
  const { authDispatch } = useAuth();

  // local states
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signInLoading, setSignInLoading] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const [emailErr, setEmailErr] = useState([]);
  const [passErr, setPassErr] = useState([]);
  const [fieldErr, setFieldErr] = useState([]);
  const [someErr, setSomeErr] = useState(false);

  // react-router-dom
  const navigate = useNavigate();

  // functions
  const getTokens = async (em, pas) => {
    setSignInLoading(true);
    const res = await axios.post("http://127.0.0.1:8000/dj-rest-auth/login/", {
      email: em,
      password: pas,
    });
    console.log(res);
    authDispatch({ type: "setInfos", payload: res.data });
    localStorage.setItem("access_token", JSON.stringify(res.data.access_token));
    localStorage.setItem(
      "refresh_token",
      JSON.stringify(res.data.refresh_token)
    );
    setSignInLoading(false);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registerUser = async () => {
      setSignUpLoading(true);
      const data = { email, full_name: fullName, password1, password2 };
      const res = await axios.post(
        "http://127.0.0.1:8000/dj-rest-auth/registration/",
        data
      );
      setSignUpLoading(false);
      console.log("register res", res);
      setSignUpSuccess(true);
      setTimeout(() => setSignUpSuccess(false), 4000);

      getTokens(email, password1).catch((err) => {
        setSignInLoading(false);
        console.log(err);
      });
      setEmail("");
      setFullName("");
      setPassword1("");
      setPassword2("");
    };

    registerUser().catch((err) => {
      console.log("register user err", err);
      setSignUpLoading(false);
      if (err.response.data.email) {
        setEmailErr(err.response.data.email);
        setTimeout(() => setEmailErr([]), 4000);
      }
      if (err.response.data.password1) {
        setPassErr(err.response.data.password1);
        setTimeout(() => setPassErr([]), 4000);
      }
      if (err.response.data.non_field_errors) {
        setFieldErr(err.response.data.non_field_errors);
        setTimeout(() => setFieldErr([]), 4000);
      }
      if (err.response.status === 500) {
        setSomeErr(true);
        setTimeout(() => setSomeErr(false), 4000);
      }
      setEmail("");
      setFullName("");
      setPassword1("");
      setPassword2("");
    });
  };

  // variables
  const googleUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=http://localhost:3000/login&prompt=consent&response_type=code&client_id=205634597669-0v561vtjjmevogap6rs9nd34dhcp5gna.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=online&state=google";
  const githubUrl =
    "https://github.com/login/oauth/authorize?redirect_uri=http://localhost:3000/login&client_id=99ac0be5f459199f2a82&scope=user&state=github";

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 font-inter">
      {/* Alerts */}
      <div className="fixed top-20 right-10 w-fit transition duration-500 flex flex-col space-y-3">
        {emailErr?.map((t, index) => {
          return <Alert text={t} type="error" key={index} />;
        })}
        {passErr?.map((t, index) => {
          return <Alert text={t} type="error" key={index} />;
        })}
        {fieldErr?.map((t, index) => {
          return <Alert text={t} type="error" key={index} />;
        })}
        {someErr ? <Alert text="Something went wrong!" type="error" /> : null}
        {signUpSuccess ? (
          <Alert
            text="Account register successfully. Signing you in..."
            type="success"
          />
        ) : null}
      </div>

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

          <div className="flex items-center justify-start mt-4">
            <input
              type="submit"
              value="Reggister"
              className={`btn ${
                signUpLoading || signInLoading ? "btn-disabled" : ""
              }`}
            />
            {signUpLoading || signInLoading ? (
              <span className="traditional ml-5 mb-10" />
            ) : null}
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
