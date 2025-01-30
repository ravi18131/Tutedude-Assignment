import React from "react";
import "./index.css";

const VerifiedEmail = () => {
  return (
    <div className="email-container">
      <div className="email-content">
        <h1 className="main-title">Royal Beekeeper</h1>
        <h2 className="success-message">
          😊😊😊 Your Email Verified Successfully !!
        </h2>
        <p className="info-text">Your Account Successfully Verified</p>
        <p className="description-text">
          Your Royal Beekeeper account has been created and verified
          successfully. Now you can log in with your registered email.
        </p>
      </div>
    </div>
  );
};

export default VerifiedEmail;
