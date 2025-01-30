import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "./style.css";
import { Card } from "@mui/material";

import { MyContext } from "../../App";

const HomeCat = (props) => {
  const context = useContext(MyContext);

  return (
    <section className="product-category">
      <div className="container">
        <h3 className="mb-3 hd">Product Categories</h3>
        <Swiper
          slidesPerView={2}
          spaceBetween={20}
          navigation={false}
          loop={true}
          modules={[Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            200: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            400: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            576: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 15,
            },
            992: {
              slidesPerView: 6,
              spaceBetween: 15,
            },
            1200: {
              slidesPerView: 7,
              spaceBetween: 20,
            },
          }}
        >
          {props.catData?.length !== 0 &&
            props.catData?.map((cat, index) => {
              return (
                <SwiperSlide key={index}>
                  <Link to={`/products/category/${cat._id}`}>
                    <Card
                      className="item text-center cursor"
                      sx={{
                        background: "var(--bgLight)",
                        height: "100%",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: 3,
                        },
                      }}
                    >
                      <div className="image">
                        <img src={cat.images} />
                      </div>

                      <h6>{cat.name}</h6>
                    </Card>
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </section>
  );
};

export default HomeCat;
