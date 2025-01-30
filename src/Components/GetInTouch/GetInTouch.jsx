import React from "react";
import "./GetInTouch.css";
import { Link } from "react-router-dom"; // Adjust if you're using React Router instead of Next.js
import Heading from "../Heading/Heading";

const GetInTouch = () => {
  return (
    <section className="container">
      <div className="get-in-touch">
        <Heading
          name="Join FriendHive"
          description="Sign up now and start connecting with like-minded people."
        />

        <div className="content">
          <p>
            Ready to <span>expand your social circle</span> and make meaningful connections?
            <br />
            Join FriendHive and connect with friends who share your interests!
          </p>
          <Link to="/signup" className="cta-button">
            Join Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
