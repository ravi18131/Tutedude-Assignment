import React from "react";
import { Link } from "react-router-dom"; // For React Router in place of Next.js's Link
import { Chip, Stack, useMediaQuery } from "@mui/material";
import { FaHashtag } from "react-icons/fa";
import { RiHashtag } from "react-icons/ri";
import heroSectionImg from "../../assets/images/hero-section.webp"
import "./HeroSection.css";

const HomePageHeader = () => {
  const isSmallScreen = useMediaQuery("(max-width: 400px)");
  const isExtraSmallScreen = useMediaQuery("(max-width: 350px)");

  return (
    <>
      <section className="container hero-section">
        <div className="row g-2" style={{ marginTop: 50 }}>
          <div className="left-section col-12 col-lg-6 order-lg-first order-last">
            <h1 className="git-nexa">
              Innovative Solutions for a Smarter Digital Future
            </h1>

            <p className="hero-section-para">
              GitNexa delivers custom, high-performance and secure digital
              solutions using the{" "}
              <b style={{ color: "var(--secondaryColor)", fontWeight: "500" }}>
                latest technologies
              </b>{" "}
              like MERN, React, and Flutter, with a risk free{" "}
              <b style={{ color: "var(--secondaryColor)", fontWeight: "500" }}>
                1-month free trial
              </b>{" "}
              to guarantee client satisfaction.
            </p>

            <div>
              <Stack
                direction={isExtraSmallScreen ? "column" : "row"}
                spacing={isSmallScreen ? 1 : 2}
                alignItems={isSmallScreen ? "flex-start" : "center"}
                flexWrap="wrap"
              >
                <Chip
                  label="1 months free trial"
                  icon={
                    isSmallScreen ? (
                      <RiHashtag
                        style={{ color: "var(--primaryColor)" }}
                        size={isSmallScreen ? 12 : 14}
                      />
                    ) : (
                      <FaHashtag style={{ color: "var(--primaryColor)" }} />
                    )
                  }
                  variant="outlined"
                  className={!isSmallScreen ? "big-chip" : "small-chip"}
                />

                <Chip
                  label="Latest technology stack"
                  icon={
                    isSmallScreen ? (
                      <RiHashtag
                        style={{ color: "var(--primaryColor)" }}
                        size={isSmallScreen ? 12 : 14}
                      />
                    ) : (
                      <FaHashtag style={{ color: "var(--primaryColor)" }} />
                    )
                  }
                  variant="outlined"
                  className={!isSmallScreen ? "big-chip" : "small-chip"}
                />
              </Stack>
            </div>

            <div>
              <Link to="/free-quote" className="hero-section-btn">
                Get a Free Quote
              </Link>
            </div>
          </div>

          {/* Main Header Right Side */}
          <div className="right-section col-12 col-lg-6 order-md-first order-sm-first d-flex align-items-center justify-content-center">
            <img
              src={heroSectionImg}
              alt="GitNexa Technology"
              style={{ width: "100%", zIndex: "1" }}
            />
          </div>

          <div className="bg-color"></div>
          <div className="bg-graphic"></div>
        </div>
      </section>
    </>
  );
};

export default HomePageHeader;
