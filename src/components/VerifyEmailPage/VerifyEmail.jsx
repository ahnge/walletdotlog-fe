import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../Alert";

const VerifyEmail = () => {
  // local states
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);

  const [loading, setLoading] = useState(false);

  // navigate
  const navigate = useNavigate();

  // params
  const { key } = useParams();

  // functions
  const handleClick = () => {
    const verifyKey = async () => {
      setLoading(true);
      const url = "http://localhost:8000/dj-rest-auth/account-confirm-email/";
      const res = await axios.post(url, { key });
      console.log(res);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setLoading(false);
        navigate("/");
      }, 4000);
    };

    verifyKey().catch((err) => {
      console.log("verifyKey error: ", err);
      setErr(true);
      setTimeout(() => {
        setErr(false);
        setLoading(false);
        navigate("/");
      }, 4000);
    });
  };
  return (
    <>
      <div className="fixed z-50 top-20 right-10 w-fit transition duration-500 flex flex-col space-y-3">
        {err ? (
          <Alert text="something went wrong! Redirecting" type="error" />
        ) : null}
        {success ? (
          <Alert text="Verified successfully! Redirecting..." type="success" />
        ) : null}
      </div>
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 font-inter">
        <div className="px-6 py-4 flex flex-col items-center">
          <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Verify that this email address is yours.
          </h3>
          <div className="flex justify-center">
            <button
              className={`btn mt-8 ${loading ? "btn-disabled" : ""}`}
              onClick={handleClick}
            >
              Verify
            </button>
            {loading && <div className="traditional mt-9 ml-5"></div>}
          </div>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700"></div>
      </div>
    </>
  );
};

export default VerifyEmail;
