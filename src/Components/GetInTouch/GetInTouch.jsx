import React from "react";
import "./GetInTouch.css";
import { Link } from "react-router-dom"; // Adjust if you're using React Router instead of Next.js
import Heading from "../Heading/Heading";

const GetInTouch = () => {
  return (
    <section className="container">
      <div className="get-in-touch">
        <Heading
          name="Get in touch"
          description="Book a free consultancy right now."
        />

        <div className="content">
          <p>
            Ready to <span>transform your vision</span> into reality?
            <br />
            Let’s get started on your project!
          </p>
          <Link to="/free-quote" className="cta-button">
            Schedule Free Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
