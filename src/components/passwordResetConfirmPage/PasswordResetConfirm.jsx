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
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
          setLoading(false);
          setSuccess("");
          navigate("/");
        }, 2000);
      }
    };

    resetPass().catch((err) => {
      console.log(err);
      setLoading(false);
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
      {/* Alerts */}
      <div className="fixed top-20 right-10 w-fit transition duration-500 flex flex-col space-y-3">
        {passErr?.map((t, index) => {
          return <Alert text={t} type="error" key={index} />;
        })}
        {err ? <Alert text="something went woong" type="error" /> : null}
        {success ? <Alert text={success} type="success" /> : null}
      </div>
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 font-inter">
        <div className="px-6 py-4">
          <h3 className="mt-3 text-3xl font-bold text-center text-gray-600 dark:text-gray-200">
            Reset password
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="w-full mt-5">
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
              <input
                type="submit"
                value="Confirm"
                className={`btn ${loading ? "btn-disabled" : ""}`}
              />
              {loading && <span className="traditional ml-5 mb-10"></span>}
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700"></div>
      </div>
    </>
  );
};

export default PasswordResetConfirm;
