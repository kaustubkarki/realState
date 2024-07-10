import React from "react";
import "./warningSign.scss";

const WarningSign = ({ message }) => {
  return (
    <div className="warningSign">
      <p>{message}</p>
    </div>
  );
};

export default WarningSign;
