import React from "react";
import "./Footer.css";
import { Facebook, Github, Instagram, LinkedIn, Twitter } from "../Icons";
import Newsletter from "./components/Newsletter";
import { useLang } from "@hyperobjekt/react-dashboard";
import { FooterStyle } from "./Footer.style";
import { getAssetPath } from "../utils";
const Footer = () => {
  const [
    FOOTER_CONNECT,
    FOOTER_COPYWRITE,
    FOOTER_MAP_BY,
    FOOTER_SITE_BY,
    FOOTER_FUNDERS,
    FOOTER_PHOTO_CREDIT,
    SITE_HOME,
    SITE_MAP,
    SITE_RANKINGS,
    SITE_SCORECARD,
    SITE_ABOUT,
    SITE_WHY_MATTERS,
    SITE_METHODS,
    SITE_FAQ,
    SITE_UPDATES,
    SITE_CONTACT,
    SITE_GET_DATA,
    SITE_DATA_REQUEST,
    SITE_MEDIA,
  ] = useLang([
    "FOOTER_CONNECT",
    "FOOTER_COPYWRITE",
    "FOOTER_MAP_BY",
    "FOOTER_SITE_BY",
    "FOOTER_FUNDERS",
    "FOOTER_PHOTO_CREDIT",
    "SITE_HOME",
    "SITE_MAP",
    "SITE_RANKINGS",
    "SITE_SCORECARD",
    "SITE_ABOUT",
    "SITE_WHY_MATTERS",
    "SITE_METHODS",
    "SITE_FAQ",
    "SITE_UPDATES",
    "SITE_CONTACT",
    "SITE_GET_DATA",
    "SITE_DATA_REQUEST",
    "SITE_MEDIA",
  ]);
  return (
    <FooterStyle>
      <Newsletter />
      <footer>
        <div className="footer-content">
          <div className="footer-logo">
            <img
              className="horizontal-logo"
              src={getAssetPath("assets/img/logo-dark.svg")}
              alt="Eviction Lab"
            />
          </div>
          <div className="footer-navigation">
            <ul>
              <li>
                <a href="https://evictionlab.org/">{SITE_HOME}</a>
              </li>
              <li>
                <a href="https://evictionlab.org/map">{SITE_MAP}</a>
              </li>
              <li>
                <a href="https://evictionlab.org/rankings">{SITE_RANKINGS}</a>
              </li>
              <li>
                <a href="https://evictionlab.org/covid-policy-scorecard">
                  {SITE_SCORECARD}
                </a>
              </li>
              <li>
                <a href="https://evictionlab.org/about">{SITE_ABOUT}</a>
              </li>
              <li>
                <a href="https://evictionlab.org/why-eviction-matters">
                  {SITE_WHY_MATTERS}
                </a>
              </li>
              <li>
                <a href="https://evictionlab.org/methods">{SITE_METHODS}</a>
              </li>
              <li>
                <a href="https://evictionlab.org/help-faq">{SITE_FAQ}</a>
              </li>
              <li>
                <a href="https://evictionlab.org/updates">{SITE_UPDATES}</a>
              </li>
              <li>
                <a href="https://evictionlab.org/contact">{SITE_CONTACT}</a>
              </li>
              <li>
                <a href="https://evictionlab.org/get-the-data">
                  {SITE_GET_DATA}
                </a>
              </li>
              <li>
                <a href="https://evictionlab.org/data-request">
                  {SITE_DATA_REQUEST}
                </a>
              </li>
              <li>
                <a href="https://evictionlab.org/media-guide">{SITE_MEDIA}</a>
              </li>
            </ul>
          </div>
          <div className="footer-social">
            <p>{FOOTER_CONNECT}</p>
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
              <p>{FOOTER_COPYWRITE}</p>
              <p>
                {FOOTER_MAP_BY}{" "}
                <a href="https://mapbox.com" target="_blank">
                  Mapbox
                </a>
              </p>
              <p>
                {FOOTER_SITE_BY}{" "}
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
              <strong>{FOOTER_FUNDERS}</strong>
              Bill and Melinda Gates Foundation • C3.ai Digital Transformation
              Institute • Chan Zuckerberg Initiative • Ford Foundation • The JPB
              Foundation • Princeton University
            </p>
          </div>
          <div className="footer-credits">
            <p>{FOOTER_PHOTO_CREDIT}</p>
          </div>
        </div>
      </footer>
    </FooterStyle>
  );
};

export default Footer;
