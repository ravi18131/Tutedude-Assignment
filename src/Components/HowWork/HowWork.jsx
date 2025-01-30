import React from "react";
import "./HowWork.css";
import Heading from "../Heading/Heading";

const OurDevelopmentProcess = () => {
  return (
    <section className="container">
      <div className="design-process-container" style={{ marginTop: 80 }}>
        <Heading
          name="Our Development Process"
          description="This is the our development process modal"
        />

        <div className="steps">
          <div className="step step-a">
            <div className="mobile-step step-1">
              <div className="first-icon">
                <i className="fa-solid fa-bullseye icon icon-1"></i>
              </div>
            </div>
            <h3>Strategy and Planning</h3>
            <p>
              Define goals, conduct research, and outline the project roadmap.
            </p>
          </div>

          <div className="step step-b">
            <div className="mobile-step step-2">
              <div className="second-icon">
                <i className="fa-solid fa-layer-group icon icon-2"></i>
              </div>
            </div>
            <h3>Design and Prototyping</h3>
            <p>
              Create wire-frames, design UI/UX, and develop interactive
              prototypes.
            </p>
          </div>

          <div className="step step-c">
            <div className="mobile-step step-3">
              <div className="third-icon">
                <i className="fa-solid fa-code icon icon-3"></i>
              </div>
            </div>
            <h3>Development and Testing</h3>
            <p>
              Implement front-end/back-end code, run automated tests, and
              resolve issues.
            </p>
          </div>

          <div className="step step-d">
            <div className="mobile-step step-4">
              <div className="forth-icon">
                <i className="fa-solid fa-server icon icon-4"></i>
              </div>
            </div>
            <h3>Launch and Maintenance</h3>
            <p>Deploy, monitor performance, and provide continuous updates.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurDevelopmentProcess;
