import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import "./style.css";

const HomeBanner = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log("props : ", props)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container mt-3">
      <div className="homeBannerSection">
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          navigation={windowWidth > 992 ? true : false}
          loop={true}
          speed={500}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
        >
          {props?.data?.length !== 0 &&
            props?.data?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="item">
                    <img src={item?.images} width="100%" />
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HomeBanner;
