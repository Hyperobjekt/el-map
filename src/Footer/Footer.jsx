import React from "react";
import "./Footer.css";
import { Facebook, Github, Instagram, LinkedIn, Twitter } from "../Icons";
import Newsletter from "./components/Newsletter";
import { FooterStyle } from "./Footer.style";
const Footer = () => {
  return (
    <FooterStyle>
      <Newsletter />
      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <img
              class="horizontal-logo"
              src="/assets/img/logo-dark.svg"
              alt="Eviction Lab"
            />
          </div>
          <div className="footer-navigation">
            <ul>
              <li>
                <a href="https://evictionlab.org/">Home</a>
              </li>
              <li>
                <a href="https://evictionlab.org/map">National Eviction Map</a>
              </li>
              <li>
                <a href="https://evictionlab.org/rankings">Eviction Rankings</a>
              </li>
              <li>
                <a href="https://evictionlab.org/covid-policy-scorecard">
                  Policy Scorecard
                </a>
              </li>
              <li>
                <a href="https://evictionlab.org/about">About the Lab</a>
              </li>
              <li>
                <a href="https://evictionlab.org/why-eviction-matters">
                  Why Eviction Matters
                </a>
              </li>
              <li>
                <a href="https://evictionlab.org/methods">Methods</a>
              </li>
              <li>
                <a href="https://evictionlab.org/help-faq">FAQ</a>
              </li>
              <li>
                <a href="https://evictionlab.org/updates">All Updates</a>
              </li>
              <li>
                <a href="https://evictionlab.org/contact">Contact Us</a>
              </li>
              <li>
                <a href="https://evictionlab.org/get-the-data">Get the Data</a>
              </li>
              <li>
                <a href="https://evictionlab.org/data-request">
                  Data Request Application
                </a>
              </li>
              <li>
                <a href="https://evictionlab.org/media-guide">Media Guide</a>
              </li>
            </ul>
          </div>
          <div className="footer-social">
            <p>Connect With Us</p>
            <ul>
              <li>
                <a
                  className="icon-wrapper"
                  href="https://www.facebook.com/evictionlab/"
                  target="_blank"
                >
                  <Facebook aria-label="Eviction Lab on Facebook" />
                </a>
              </li>
              <li>
                <a
                  className="icon-wrapper"
                  href="https://twitter.com/evictionlab"
                  target="_blank"
                >
                  <Twitter aria-label="Eviction Lab on Twitter" />
                </a>
              </li>
              <li>
                <a
                  className="icon-wrapper"
                  href="https://github.com/EvictionLab/eviction-maps"
                  target="_blank"
                >
                  <Github aria-label="Eviction Lab on Github" />
                </a>
              </li>
              <li>
                <a
                  className="icon-wrapper"
                  href="https://www.instagram.com/evictionlab/"
                  target="_blank"
                >
                  <Instagram aria-label="Eviction Lab on Instagram" />
                </a>
              </li>
              <li>
                <a
                  className="icon-wrapper"
                  href="https://www.linkedin.com/company/evictionlab/"
                  target="_blank"
                >
                  <LinkedIn aria-label="Eviction Lab on LinkedIn" />
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-copyright">
            <div className="copyright-text">
              <p>All content © Eviction Lab. All rights reserved.</p>
              <p>
                Map made possible by{" "}
                <a href="https://mapbox.com" target="_blank">
                  Mapbox
                </a>
              </p>
              <p>
                Site by{" "}
                <a href="https://www.hyperobjekt.com/" target="_blank">
                  Hyperobjekt
                </a>
              </p>
            </div>
          </div>
          <div className="footer-princeton">
            <img
              alt="Princeton Logo"
              src="https://evictionlab.org/tool/assets/images/princeton-logo.svg"
            />
          </div>
          <div className="footer-funders">
            <p>
              <strong>Our Funders</strong>
              Bill and Melinda Gates Foundation • C3.ai Digital Transformation
              Institute • Chan Zuckerberg Initiative • Ford Foundation • The JPB
              Foundation • Princeton University
            </p>
          </div>
          <div className="footer-credits">
            <p>Photo by Sasha Israel</p>
          </div>
        </div>
      </footer>
    </FooterStyle>
  );
};

export default Footer;
