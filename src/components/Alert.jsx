import React from "react";
import { Error, Info, Success, Warning } from "./svgs/Alerts";

const Alert = ({ text, type }) => {
  return (
    <div
      className={`alert shadow-lg ${
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
  );
};

export default Alert;
