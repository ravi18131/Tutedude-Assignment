import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { useSnackbar } from "../../context/SnackbarProvider";
import "./style.css";


import Header from "../../Components/Header/index";
import Footer from "../../Components/Footer/index";
import HeroSection from "../../Components/HeroSection/HeroSection"
import BenefitesFriendHive from "../../Components/BenefitesFriendHive/BenefitesFriendHive";
import HowWork from "../../Components/HowWork/HowWork"
import GetInTouch from "../../Components/GetInTouch/GetInTouch";
import Testimonial from "../../Components/Tranding/Tranding";

const Home = () => {

  // const [homeSlides, setHomeSlides] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Header />
      <HeroSection />
      <BenefitesFriendHive />
      <HowWork />
      {/* <Testimonial /> */}
      {/* <div className="container" style={{ marginTop: "3rem" }}>
        <h2
          style={{
            fontSize: "1.35rem",
            color: "var(--textColor)",
            fontWeight: "500",
          }}
        >
          Grow your connections
        </h2>
        <p
          style={{
            fontSize: "1rem",
            textAlign: "justify",
            fontWeight: "normal",
            color: "var(--textLight)",
          }}
        >
          At FriendHive, we offer a wide range of social networking features that
          help you connect with like-minded people. Our platform is designed to
          provide a safe, engaging space for individuals to build meaningful
          friendships, share moments, and discover new experiences. Join us today and
          start your journey towards building lasting friendships, all from the
          comfort of your home!
        </p>
      </div> */}
      <GetInTouch/>
      <Footer />
    </>
  );
};

export default Home;
