import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../Alert";
import useAxios from "../../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

const VerifyEmail = () => {
  // navigate
  const navigate = useNavigate();

  // params
  const { key } = useParams();

  const axiosInstance = useAxios();

  const verifyKey = () => {
    return axiosInstance.post("dj-rest-auth/account-confirm-email/", { key });
  };

  const { mutate, isLoading, isSuccess, isError } = useMutation(verifyKey, {
    onSettled: () => {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    },
  });

  return (
    <>
      {/* Alert */}
      {isError && (
        <Alert text="Something went wrong. Redirecting..." type="error" />
      )}
      {isSuccess && (
        <Alert
          text="Email verified successfully! Redirecting.."
          type="success"
        />
      )}
      {/* Alert end */}
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 font-inter">
        <div className="px-6 py-4 flex flex-col items-center">
          <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Verify that this email address is yours.
          </h3>
          <button
            className={`btn mt-8 ${isLoading ? "btn-disabled loading" : ""}`}
            onClick={mutate}
          >
            Verify
          </button>
        </div>

        <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700"></div>
      </div>
    </>
  );
};

export default VerifyEmail;
