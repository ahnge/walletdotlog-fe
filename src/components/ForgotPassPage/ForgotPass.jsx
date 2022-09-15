import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "../Alert";

const ForgotPass = () => {
  // local states
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");
  const [err, setErr] = useState([]);

  // functions
  const handleClick = (e) => {
    e.preventDefault();
    const getInstructinos = async () => {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:8000/dj-rest-auth/password/reset/",
        { email }
      );
      console.log(res);
      setLoading(false);
      setEmail("");
      if (res.data.detail) {
        setSuccess(res.data.detail);
        setTimeout(() => setSuccess(""), 3800);
      }
    };
    getInstructinos().catch((err) => {
      console.log("getInstructions err:", err);
      setEmail("");
      if (err.response.data.email) {
        setErr(err.response.data.email);
        setTimeout(() => setErr([]), 3800);
      }
    });
  };
  return (
    <div>
      <div className=" fixed top-20 right-10 w-fit transition duration-500 flex flex-col space-y-3">
        {success ? <Alert text={success} type="success" /> : null}
        {err?.map((t, index) => {
          return <Alert text={t} type="warning" key={index} />;
        })}
      </div>
      <Link to="/login" className="btn mb-8">
        back
      </Link>
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 font-inter">
        <div className="flex p-8 flex-col justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <form className="form-control" onSubmit={handleClick}>
            <label className="label">
              <span className="label-text text-start">
                What is your account email address?
              </span>
            </label>
            <label className="input-group">
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
            <div className="flex justify-start">
              <input
                type="submit"
                className={`btn mt-5 w-fit ${loading ? "btn-disabled" : ""}`}
                value="Send me instructions"
              />
              {loading && <span className="traditional ml-5 mt-5"></span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
