"use client";

import React from "react";
import { Chip } from "@mui/material";
import StarRatings from "react-star-ratings";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

// Utility function to truncate text
const truncate = (text, length) => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

const TestimonialSlider = ({ testimonials }) => {
  return (
    <div className="testimonial">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        modules={[Navigation, Autoplay]}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        navigation
        breakpoints={{
          280: {
            slidesPerView: 1,
          },
          992: {
            slidesPerView: 1,
          },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-content">
              <div className="slide">
                <img
                  src={testimonial.author.image || "/images/user.png"}
                  alt={testimonial.author.name}
                  className="image"
                  // onError={(e) => {
                  //   e.target.src = "/images/user.png";
                  // }}
                />
                <p className="review-title">{testimonial.title}</p>

                <StarRatings
                  rating={parseFloat(testimonial.rating)}
                  starRatedColor="#f4c150"
                  numberOfStars={5}
                  name="rating"
                  starDimension="16px"
                  starSpacing="4px"
                />

                <p className="review-description">
                  {truncate(testimonial.content, 100)}
                </p>

                <i className="bx bxs-quote-alt-left quote-icon"></i>

                <div className="details">
                  <span className="name">{`${testimonial.author.name} (${
                    testimonial.author.position +
                    ", " +
                    testimonial.author.company
                  })`}</span>

                  <Chip
                    className="recommendation"
                    label={
                      testimonial.isRecommended
                        ? "Recommended"
                        : "Not Recommended"
                    }
                    icon={
                      testimonial.isRecommended ? (
                        <FaRegThumbsUp style={{ color: "green" }} />
                      ) : (
                        <FaRegThumbsDown style={{ color: "#96271f" }} />
                      )
                    }
                    variant="outlined"
                    sx={{
                      backgroundColor: "var(--bgLight)",
                      color: testimonial.isRecommended ? "green" : "#96271f",
                      borderRadius: "6px",
                      padding: "8px",
                    }}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;


// Example Usage
// Render this component and pass `dummyTestimonials` as props
// <TestimonialSlider testimonials={dummyTestimonials} />
