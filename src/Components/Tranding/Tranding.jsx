import React, { useState } from "react";
import "./Tranding.css";
import TestimonialSlider from "./TrandingSlider";
import Heading from "../Heading/Heading";

// Dummy Data
const reviews = [
  {
    _id: "1",
    userId: "user1",
    author: {
      name: "Jane Doe",
      position: "CEO",
      image: "https://via.placeholder.com/150",
      company: "TechCorp",
    },
    title: "Great Service!",
    category: "Customer Feedback",
    content: "The service was excellent and exceeded my expectations.",
    rating: "4.5",
    isRecommended: true,
    tags: ["service", "customer", "feedback"],
    createdAt: "2023-01-01",
    updatedAt: "2023-01-15",
  },
  {
    _id: "2",
    userId: "user2",
    author: {
      name: "John Smith",
      position: "CTO",
      image: "https://via.placeholder.com/150",
      company: "InnovateTech",
    },
    title: "Could Be Better",
    category: "Customer Feedback",
    content: "The experience was okay, but there's room for improvement.",
    rating: "3.0",
    isRecommended: false,
    tags: ["service", "feedback"],
    createdAt: "2023-02-01",
    updatedAt: "2023-02-10",
  },
];

const Testimonial = () => {

  return (
    <section className="container" style={{ marginTop: 80 }}>
      <Heading
        name="Testimonials"
        description="What our clients say about us"
      />

      <div className="testimonial-container">
        <TestimonialSlider testimonials={reviews} />
      </div>
    </section>
  );
};

export default Testimonial;
