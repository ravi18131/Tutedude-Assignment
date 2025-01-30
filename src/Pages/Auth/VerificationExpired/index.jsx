import React from "react";
import "./index.css";

const FailedVerification = () => {
  return (
    <div className="email-container-failed">
      <div className="email-content-failed">
        <h1 className="failed-title">Failed Verification !!</h1>
        <p className="expired-text">Expired Link, please sign up again!</p>
        <p className="description-text">
          The link has been expired. Please sign in again to email verification.
        </p>
      </div>
    </div>
  );
};

export default FailedVerification;
