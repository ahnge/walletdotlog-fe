import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../Alert";
import useAxios from "../../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

const PasswordResetConfirm = () => {
  // local states
  const [newPass1, setNewPass1] = useState();
  const [newPass2, setNewPass2] = useState();

  // params
  const { uid, token } = useParams();

  const navigate = useNavigate();

  const axiosInstance = useAxios();

  const resetPassword = () => {
    return axiosInstance.post("dj-rest-auth/password/reset/confirm/", {
      uid,
      token,
      new_password1: newPass1,
      new_password2: newPass2,
    });
  };

  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation(
    resetPassword,
    {
      onSettled: () => {
        setNewPass1("");
        setNewPass2("");
      },
      onSuccess: () => {
        setTimeout(() => navigate("/login"), 3000);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      {/* Alerts */}
      {isError && error.response.data.new_password2 ? (
        error.response.data.new_password2.map((text) => {
          return <Alert text={text} type="error" key={text} />;
        })
      ) : isError && error.response.data.token ? (
        <Alert text="Invalid token. Please try later." type="error" />
      ) : null}
      {isSuccess && <Alert text={data.data.detail} type="success" />}
      {/* Alert end */}
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

            <button
              type="submit"
              className={`btn mt-4 ${isLoading ? "btn-disabled loading" : ""}`}
            >
              Confirm
            </button>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700"></div>
      </div>
    </>
  );
};

export default PasswordResetConfirm;
