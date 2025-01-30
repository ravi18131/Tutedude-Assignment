import React from "react";
import "./index.css";

const AlreadyVerified = () => {
  return (
    <div className="email-container-verified">
      <div className="email-content-verified">
        <h1 className="verified-title">Email Already Verified !!</h1>
        <p className="success-text">
          Your email is already verified. You can now log in to your account.
        </p>
        <p className="description-text">
          If you need further assistance, feel free to contact our support team.
        </p>
      </div>
    </div>
  );
};

export default AlreadyVerified;
