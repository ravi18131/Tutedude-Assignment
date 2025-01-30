import React from "react";
import "./BenefitesFriendHive.css"; // Ensure the relative path to the CSS file is correct
import Heading from "../Heading/Heading"; // Ensure the relative path to the Heading component is correct
import 'boxicons/css/boxicons.min.css';

const WhyFriendHive = () => {
  return (
    <>
      <section className="container" style={{ marginTop: 100 }}>
        <Heading
          name="Why Choose FriendHive?"
          description="Discover the core features of FriendHive that help you build meaningful connections."
        />

        <div className="why-friendhive">
          <div className="card">
            <div className="icon first-icon">
              <i className="bx bx-user-check bx-tada-hover icon-1"></i>
            </div>
            <div className="content">
              <h2>Smart Connection Recommendations</h2>
              <p>
                Discover new connections based on shared interests, and mutual friends.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="icon second-icon">
              <i className="bx bx-chat bx-tada-hover icon-2"></i>
            </div>
            <div className="content">
              <h2>Real-Time Communication</h2>
              <p>
                Engage in communication with friends to stay connected.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="icon third-icon">
              <i className="bx bx-user bx-tada-hover icon-3"></i>
            </div>
            <div className="content">
              <h2>Customizable Profiles</h2>
              <p>
                Personalize your profile to showcase your personality to connect individuals.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="icon forth-icon">
              <i className="bx bx-lock bx-tada-hover icon-4"></i>
            </div>
            <div className="content">
              <h2>Flexible Privacy Settings</h2>
              <p>
                Manage your privacy by controlling what information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyFriendHive;
