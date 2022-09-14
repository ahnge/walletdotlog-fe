import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../svgs/Logo";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "../Alert";

const PasswordResetConfirm = () => {
  // local states
  const [newPass1, setNewPass1] = useState();
  const [newPass2, setNewPass2] = useState();

  const [success, setSuccess] = useState("");

  const [err, setErr] = useState(false);
  const [passErr, setPassErr] = useState([]);

  // params
  const { uid, token } = useParams();

  // react-router
  const navigate = useNavigate();

  // functions
  const handleSubmit = (e) => {
    e.preventDefault();
    const resetPass = async () => {
      const url = "http://localhost:8000/dj-rest-auth/password/reset/confirm/";
      const res = await axios.post(url, {
        uid,
        token,
        new_password1: newPass1,
        new_password2: newPass2,
      });
      console.log(res);
      if (res.data.detail) {
        setSuccess(res.data.detail);
        setTimeout(() => {
          setSuccess("");
          navigate("/");
        }, 3800);
      }
    };
    resetPass().catch((err) => {
      console.log(err);
      if (err.response.data.new_password2) {
        setPassErr(err.response.data.new_password2);
        setTimeout(() => setPassErr([]), 3800);
      } else {
        setErr(true);
        setTimeout(() => setErr(false), 3800);
      }
      setNewPass1("");
      setNewPass2("");
    });
  };

  useEffect(() => {
    console.log(uid, token);
  }, []);

  return (
    <>
      <div className="fixed top-20 right-10 w-fit transition duration-500 flex flex-col space-y-3">
        {passErr?.map((t, index) => {
          return <Alert text={t} type="warning" key={index} />;
        })}
        {err ? <Alert text="something went woong" type="warning" /> : null}
        {success ? <Alert text={success} type="success" /> : null}
      </div>
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 font-inter">
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
                type="password"
                placeholder="Enter your new password"
                aria-label="Enter your new password"
                required
                value={newPass1}
                onChange={(e) => setNewPass1(e.target.value)}
              />
            </div>
            <div className="w-full mt-4">
              <input
                className="input w-full"
                type="password"
                placeholder="Enter your new password again"
                aria-label="Enter your new password again"
                required
                value={newPass2}
                onChange={(e) => setNewPass2(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-start mt-4">
              <input type="submit" value="Confirm" className="btn" />
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
    </>
  );
};

export default PasswordResetConfirm;
