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
      <GetInTouch/>
      <Footer />
    </>
  );
};

export default Home;
