import React, { useState, useEffect } from "react";
import { Error, Info, Success, Warning } from "./svgs/Alerts";

const Alert = ({ text, type }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);

  return (
    <>
      {show && (
        <div className="fixed top-20 right-10 w-fit z-50 transition duration-500 flex flex-col space-y-3">
          <div
            className={`alert shadow-lg z-50 ${
              type === "error"
                ? "alert-error"
                : type === "warning"
                ? "alert-warning"
                : type === "success"
                ? "alert-success"
                : type === "info"
                ? "alert-info"
                : null
            }`}
          >
            <div>
              {type === "warning" ? <Warning /> : null}
              {type === "error" ? <Error /> : null}
              {type === "success" ? <Success /> : null}
              {type === "info" ? <Info /> : null}
              <span>{text}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
