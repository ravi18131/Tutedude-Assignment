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
              Empowering Connections for a Collaborative Future
            </h1>

            <p className="hero-section-para">
              FriendHive revolutionizes social engagement with a platform that offers{" "}
              <b style={{ color: "var(--secondaryColor)", fontWeight: "500" }}>
                seamless connections
              </b>{" "}
              and{" "}
              <b style={{ color: "var(--secondaryColor)", fontWeight: "500" }}>
                personalized experiences
              </b>{" "}
              using{" "}
              <b style={{ color: "var(--secondaryColor)", fontWeight: "500" }}>
                a user-centric design
              </b>{" "}
              to help users foster meaningful relationships.
            </p>

            <div>
              <Link to="#" className="hero-section-btn">
                Join now
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
