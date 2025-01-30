import HomeBanner from "../../Components/HomeBanner";
import banner1 from "../../assets/images/banner1.png";
import banner2 from "../../assets/images/banner2.png";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import { useSnackbar } from "../../context/SnackbarProvider";
import royaljelly from "../../assets/images/royaljelly.png";
import honeydryfruits from "../../assets/images/honeydryfruits.png";
import beepollen from "../../assets/images/beepollen.png";
import slideBanner1 from "../../assets/images/slideBanner1.jpg"
import slideBanner2 from "../../assets/images/slideBanner2.jpg"
import "./style.css";


import Header from "../../Components/Header/index";
import Footer from "../../Components/Footer/index";
import HomeContactSection from "../../Components/HomeContactSection/HomeContactSection";

const homeSlides = [
  {
    images: slideBanner1
  },
  {
    images: slideBanner2
  }
]

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
      {homeSlides?.length !== 0 && <HomeBanner data={homeSlides} />}

      <section className="homeProducts">
        <div className="container">
          <div className="row homeProductsRow">
            {windowWidth > 992 && (
              <div className="col-sm-12 col-md-3">
                <div className="sticky">
                  <div className="banner">
                    <img src={banner1} className="cursor w-100" />
                  </div>

                  <div className="banner mt-4">
                    <img src={banner2} className="cursor w-100" />
                  </div>
                </div>
              </div>
            )}

            <div className="col-sm-12 col-md-9 productRow">
              <div className="d-flex align-items-center res-flex-column">
                <div className="info" style={{ width: "35%" }}>
                  <h3 className="mb-0 hd">Popular Products</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>

                {/* Tab bar */}
              </div>

              {/* Popular Products */}

              {/* Product Banners */}
              {windowWidth > 992 ? (
                <div className="d-flex mt-4 mb-3 bannerSec">
                  <div className="banner">
                    <img src={royaljelly} className="cursor w-100" />
                  </div>

                  <div className="banner">
                    <img src={honeydryfruits} className="cursor w-100" />
                  </div>

                  <div className="banner">
                    <img src={beepollen} className="cursor w-100" />
                  </div>
                </div>
              ) : (
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={10}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                >
                  <SwiperSlide>
                    <img src={royaljelly} style={{ borderRadius: "7px" }} className="cursor w-100" alt="Royal Jelly" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={honeydryfruits} style={{ borderRadius: "7px" }} className="cursor w-100" alt="Honey with Dry Fruits" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={beepollen} style={{ borderRadius: "7px" }} className="cursor w-100" alt="Bee Pollen" />
                  </SwiperSlide>
                </Swiper>
              )}

              <div className="d-flex align-items-center mt-5">
                <div className="info w-75">
                  <h3 className="mb-0 hd">NEW PRODUCTS</h3>
                  <p className="text-light text-sml mb-0">
                    New products with updated stocks.
                  </p>
                </div>
              </div>

              {/* New Products */}
              {/* {windowWidth > 992 ? (
                <div className="productRow2 w-100 mt-4 d-flex">
                  {productsData?.products?.length !== 0 &&
                    productsData?.products
                      ?.slice(0)
                      .reverse()
                      .map((item, index) => {
                        return <ProductItem key={index} item={item} />;
                      })}
                </div>
              ) : (
                <Swiper
                  slidesPerView={3}
                  spaceBetween={10}
                  navigation={true}
                  className="new-product-slider"
                  breakpoints={{
                    200: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    500: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 10,
                    },
                  }}
                  modules={[Navigation]}
                >
                  {productsData?.products?.length !== 0 &&
                    productsData?.products
                      ?.slice(0)
                      .reverse()
                      .map((item, index) => {
                        return (
                          <SwiperSlide key={index}>
                            <ProductItem item={item} />
                          </SwiperSlide>
                        );
                      })}
                </Swiper>
              )} */}

              <div className="d-flex align-items-center mt-4">
                <div className="info">
                  <h3 className="mb-0 hd">Featured Products</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of March.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HomeContactSection />

      <div className="container" style={{ marginTop: "3rem" }}>
        <h2
          style={{
            fontSize: "1.35rem",
            color: "var(--textColor)",
            fontWeight: "500",
          }}
        >
          Shop Premium Honey Products Online
        </h2>
        <p
          style={{
            fontSize: "1rem",
            textAlign: "justify",
            fontWeight: "normal",
            color: "var(--textLight)",
          }}
        >
          At Royal BeeKeeper, we offer a wide range of 100% natural, organic
          honey products. Our honey is sustainably sourced from trusted bee
          farms, ensuring the highest quality for your health and well-being.
          Explore our selection and enjoy fast, reliable delivery of pure honey
          right to your door.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Home;
