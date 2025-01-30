import React from "react";
import "./BenefitesFriendHive.css"; // Ensure the relative path to the CSS file is correct
import Heading from "../Heading/Heading"; // Ensure the relative path to the Heading component is correct
import 'boxicons/css/boxicons.min.css';

const WhyFriendHive = () => {
  return (
    <>
      <section className="container" style={{ marginTop: 100 }}>
        <Heading
          name="Why GitNexa"
          description="Why should you choose GitNexa?"
        />

        <div className="why-friendhive">
          <div className="card">
            <div className="icon first-icon">
              <i className="bx bx-code-alt bx-tada-hover icon-1"></i>
            </div>
            <div className="content">
              <h2>Advanced Technology</h2>
              <p>
                Leveraging the latest tech stack for cutting-edge,
                cost-effective solutions.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="icon second-icon">
              <i className="bx bx-laptop bx-tada-hover icon-2"></i>
            </div>
            <div className="content">
              <h2>Risk-Free Trial</h2>
              <p>
                Experience our solutions with a 1-month free trial before making
                a commitment.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="icon third-icon">
              <i className="bx bx-shape-circle bx-tada-hover icon-3"></i>
            </div>
            <div className="content">
              <h2>Tailored Design</h2>
              <p>
                Professional, custom designs crafted to reflect your brand's
                unique identity.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="icon forth-icon">
              <i className="bx bx-check-shield bx-tada-hover icon-4"></i>
            </div>
            <div className="content">
              <h2>Optimal Performance</h2>
              <p>
                Ensuring swift performance and robust security for a top-notch
                user experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyFriendHive;
