import React from "react";
import "./HomeContactSection.css";
import Lottie from "lottie-react";
import animationData from "../../animations/lottie/get-in-touch.json";

const HomeContactSection = () => {
  return (
    <section className="container get-in-touch mt-3 mb-3 d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 order-md-first order-lg-first order-last">
            <div className="info">
              <h2>Get in touch with Royal BeeKeeper</h2>

              <h3>
                Email: <a href="mailto:royalbeekeeper11@gmail.com?subject=Inquiry&body=Hello, I would like to...">royalbeekeeper11@gmail.com</a>
              </h3>

              <h3>
                Contact: <a href="tel:+919799764138">+91 9799764138</a>
              </h3>
              <h3>
                Address:{" "}
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Ward+No.+17,+Karanpur+Road,+Purani+Abadi,+Sri+Ganganagar,+Rajasthan+335001"
                  target="_blank"
                  rel="noopener noreferrer">
                  Ward No. 17, Karanpur Road, Purani Abadi, Sri Ganganagar-335001 (Rajasthan)
                </a>
              </h3>

            </div>
          </div>

          <div className="col-12 col-md-6 order-sm-first">
            <figure className="lottie-animation">
              <Lottie
                loop={true}
                animationData={animationData}
                className="animation"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactSection;
