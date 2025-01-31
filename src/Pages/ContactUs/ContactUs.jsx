import React from "react";
import "./ContactUs.css";

const ContactPageHeader = () => {
  return (
    <>
      <section className="contact" style={{ marginTop: "100px" }}>
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>
            Have questions, feedback, or need assistance? The FriendHive team is here to help! 
            Reach out to us through phone, email, or our contact form, and we’ll respond as soon as possible. 
            Let’s build a better community together!
          </p>
        </div>

        <div className="helpline">
          {/* Contact Info item */}
          <div className="contact-info-item pad-15">
            <div className="icon">
              <i className="fa fa-phone"></i>
            </div>
            <h3>Contact Number</h3>
            <p>
              <a href="tel:+9197133856667">+91 9713385667</a>
            </p>
          </div>

          {/* Contact Info item */}
          <div className="contact-info-item pad-15">
            <div className="icon">
              <i className="fa fa-map"></i>
            </div>
            <h3>Office Address</h3>
            <p>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                FriendHive HQ, Main Street, Cityville, 12345
              </a>
            </p>
          </div>

          {/* Contact Info item */}
          <div className="contact-info-item pad-15">
            <div className="icon">
              <i className="fa fa-envelope"></i>
            </div>
            <h3>Email Us</h3>
            <p>
              <a
                href="mailto:support@friendhive.com?subject=Inquiry&body=Hello FriendHive Team, I have a question about..."
              >
                support@friendhive.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPageHeader;
