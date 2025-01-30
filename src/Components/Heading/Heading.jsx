import React from "react";
import "./Heading.css";

const Heading = ({ name, description }) => {
  return (
    <div className="container section-title">
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Heading;
