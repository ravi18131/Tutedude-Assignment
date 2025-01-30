import React from "react";
import "./HowWork.css";
import Heading from "../Heading/Heading";

const FriendHiveWorking = () => {
  return (
    <section className="container">
      <div className="design-process-container" style={{ marginTop: 80 }}>
        <Heading
          name="How FriendHive Works"
          description="Our seamless process to help you connect and interact with friends effortlessly"
        />

        <div className="steps">
          <div className="step step-a">
            <div className="mobile-step step-1">
              <div className="first-icon">
                <i className="bx bx-user-plus bx-tada-hover icon icon-1"></i>
              </div>
            </div>
            <h3>Sign Up and Profile Setup</h3>
            <p>
              Create your FriendHive account and set up a personalized profile showcasing your interests and preferences.
            </p>
          </div>

          <div className="step step-b">
            <div className="mobile-step step-2">
              <div className="second-icon">
                <i className="bx bx-search-alt-2 bx-tada-hover icon icon-2"></i>
              </div>
            </div>
            <h3>Discover New Connections</h3>
            <p>
              Explore FriendHive's smart connection recommendations to meet like-minded individuals and expand your network.
            </p>
          </div>

          <div className="step step-c">
            <div className="mobile-step step-3">
              <div className="third-icon">
                <i className="bx bx-message-dots bx-tada-hover icon icon-3"></i>
              </div>
            </div>
            <h3>Engage and Interact</h3>
            <p>
              Start meaningful conversations with new friends via text, voice, or video chat and build lasting connections.
            </p>
          </div>

          <div className="step step-d">
            <div className="mobile-step step-4">
              <div className="forth-icon">
                <i className="bx bx-shield bx-tada-hover icon icon-4"></i>
              </div>
            </div>
            <h3>Enjoy a Secure Experience</h3>
            <p>Benefit from robust privacy settings and control over your personal data for a secure and enjoyable experience.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FriendHiveWorking;
