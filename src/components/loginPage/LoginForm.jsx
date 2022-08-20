import React from "react";
import Logo from "../svgs/Logo";

function LoginForm() {
  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 font-inter">
      <div className="px-6 py-4">
        <div className=" flex justify-center">
          <Logo />
        </div>

        <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
          Welcome Back
        </h3>
        <form>
          <div className="w-full mt-4">
            <input
              className="input w-full"
              type="email"
              placeholder="Email Address"
              aria-label="Email Address"
            />
          </div>

          <div className="w-full mt-4">
            <input
              className="input w-full"
              type="password"
              placeholder="Password"
              aria-label="Password"
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <a
              href="#"
              className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
            >
              Forget Password?
            </a>

            <button
              className="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
              type="button"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-200">
          Don't have an account?{" "}
        </span>

        <a
          href="#"
          className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
        >
          Register
        </a>
      </div>
    </div>
  );
}

export default LoginForm;
