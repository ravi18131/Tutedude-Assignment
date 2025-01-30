import React from "react";
import "./ContactUsHeader.css";

const ContactPageHeader = () => {
  return (
    <>
      <section className="contact" style={{ marginTop: "100px" }}>
        <div className="contact-header">
          <h1>Help & Support</h1>
          <p>
            We're here to assist you with any questions, feedback, or orders.
            Whether you'd like to connect via phone, email, or our contact form,
            we're always ready to help. We look forward to hearing from you!
          </p>
        </div>

        <div class="helpline">
          {/* <!-- Contact Info item --> */}
          <div class="contact-info-item pad-15">
            <div class="icon">
              <i class="fa fa-phone"></i>
            </div>
            <h3>Helpline Number</h3>
            <p><a href="tel:+919799764138">+91 9799764138</a></p>
          </div>

          {/* <!-- Contact Info item --> */}
          <div class="contact-info-item pad-15">
            <div class="icon">
              <i class="fa fa-map"></i>
            </div>
            <h3>Address</h3>
            <p><a
              href="https://www.google.com/maps/search/?api=1&query=Ward+No.+17,+Karanpur+Road,+Purani+Abadi,+Sri+Ganganagar,+Rajasthan+335001"
              target="_blank"
              rel="noopener noreferrer">
              Ward No. 17, Karanpur Road, Purani Abadi, Sri Ganganagar-335001
            </a></p>
          </div>

          {/* <!-- Contact Info item --> */}
          <div class="contact-info-item pad-15">
            <div class="icon">
              <i class="fa fa-envelope"></i>
            </div>
            <h3>Email</h3>
            <p><a href="mailto:royalbeekeeper11@gmail.com?subject=Inquiry&body=Hello, I would like to...">royalbeekeeper11@gmail.com</a></p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPageHeader;
