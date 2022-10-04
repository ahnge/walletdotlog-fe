import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../Alert";
import useAxios from "../../hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

const ForgotPass = () => {
  // local states
  const [email, setEmail] = useState("");

  const axiosInstance = useAxios();

  const getInstructions = () => {
    return axiosInstance.post("dj-rest-auth/password/reset/", { email });
  };

  const { mutate, isLoading, isSuccess, isError, error, data } = useMutation(
    getInstructions,
    { onSettled: () => setEmail("") }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  if (isSuccess) {
    console.log(data);
  }

  return (
    <>
      <div className=" fixed top-20 right-10 z-50 w-fit transition duration-500 flex flex-col space-y-3">
        {isError && (
          <Alert
            text={
              error.code === "ECONNABORTED"
                ? "Connection timeout"
                : error.response?.data?.email
                ? error.response.data.email[0]
                : error.response.statusText
            }
            type="error"
          />
        )}
        {isSuccess && <Alert text={data.data.detail} type="success" />}
      </div>

      <div className="w-full max-w-sm">
        <Link to="/login" className="btn btn-md mb-8">
          back
        </Link>
        <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 font-inter">
          <div className="flex p-8 flex-col justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
            <form className="form-control" onSubmit={handleSubmit}>
              <label className="label">
                <span className="label-text text-start">
                  What is your account email address?
                </span>
              </label>
              <label className="input-group-xs input-group sm:input-group-sm md:input-group-md lg:input-group-lg">
                <span>Email</span>
                <input
                  type="text"
                  placeholder="info@site.com"
                  className="input input-bordered"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <button
                type="submit"
                className={`btn w-fit mt-4 ${
                  isLoading ? "loading btn-disabled" : ""
                }`}
              >
                Send me instruction.
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPass;
