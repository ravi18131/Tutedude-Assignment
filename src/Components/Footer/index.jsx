import { Link } from "react-router-dom";

import { GiHoneyJar } from "react-icons/gi";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiDiscount1 } from "react-icons/ci";
import { IoPricetagOutline } from "react-icons/io5";

import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import "./style.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          {/* Top Info Section */}
          <div className="topInfo row">
            <div className="col">
              <span>🔍</span>
              <span className="ml-2">Search Friends</span>
            </div>

            <div className="col">
              <span>🤝</span>
              <span className="ml-2">Add and Manage Friends</span>
            </div>

            <div className="col">
              <span>💬</span>
              <span className="ml-2">Friend Recommendations</span>
            </div>

            <div className="col">
              <span>🔐</span>
              <span className="ml-2">Secure Login & Authentication</span>
            </div>
          </div>

          <div className="row mt-5 linksWrap">
            <div className="col">
              <h5>FRIENDHIVE</h5>
              <ul className="socials">
                <li className="list-inline-item">
                  <Link to="#">
                    <FaFacebookF />
                  </Link>
                </li>

                <li className="list-inline-item">
                  <Link to="#">
                    <FaTwitter />
                  </Link>
                </li>

                <li className="list-inline-item">
                  <Link to="#">
                    <FaInstagram />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="col">
              <h5>USER</h5>
              <ul>
                <li>
                  <Link to="#">Profile</Link>
                </li>
                <li>
                  <Link to="#">Friend Requests</Link>
                </li>
                <li>
                  <Link to="#">Friend Recommendations</Link>
                </li>
              </ul>
            </div>

            <div className="col">
              <h5>SUPPORT</h5>
              <ul>
                <li>
                  <Link to="#">FAQ</Link>
                </li>
                <li>
                  <Link to="#">Contact Us</Link>
                </li>
              </ul>
            </div>

            <div className="col">
              <h5>LEGAL</h5>
              <ul>
                <li>
                  <Link to="#">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="#">Terms and Conditions</Link>
                </li>
              </ul>
            </div>

          </div>



          <hr className="divider" />

          <div className="copyright">
            <p>
              Copyright 2024. All rights reserved |{" "}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                Developed & Designed by <span>Ravi Kumar</span>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
