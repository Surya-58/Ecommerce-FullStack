import React from "react";
import { Link } from "react-router-dom";
import instagramIcon from "../Assets/icons/icon-instagram-circle.png";
import facebookIcon from "../Assets/icons/icon-facebook-circle.png";
import appStoreIcon from "../Assets/icons/icon-app-store.png";
import playStoreIcon from "../Assets/icons/icon-google-play.png";
import youtubeIcon from "../Assets/icons/icon-youtube-circle.png";
import twitterIcon from "../Assets/icons/icon-twitter-circle.png";
import visaIcon from "../Assets/icons/icon-visa.png";
import mastercardIcon from "../Assets/icons/icon-mastercard.png";
import upiIcon from "../Assets/icons/icon-upi.png";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__newsletter">
          <div>
            <h2 className="footer__newsletter-title">Stay Updated</h2>

            <p className="text-body-secondary">
              Get the latest offers, discounts and new arrivals directly in your
              inbox.
            </p>
          </div>

          <form className="footer__newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="input"
            />

            <button type="submit" className="btn btn--offer">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="container footer__grid">
        <div className="footer__brand">
          <h2>QuickCart</h2>
          <p className="footer__brand-desc">
            {" "}
            Fresh groceries and daily essentials delivered to your doorstep with
            speed and quality.
          </p>
        </div>

        <div className="footer__column">
          <h3 className="footer__col-title">Quick Links</h3>

          <Link to="/" className="footer__link">
            Home
          </Link>
          <Link to="/products" className="footer__link">
            Products
          </Link>
          <Link to="/wishlist" className="footer__link">
            Wishlist
          </Link>
          <Link to="/cart" className="footer__link">
            Cart
          </Link>
        </div>
        <div className="footer__column">
          <h3 className="footer__col-title">Contact</h3>

          <div className="footer__contact-item">📍 Coimbatore, Tamil Nadu</div>

          <div className="footer__contact-item">📞 +91 98765 43210</div>

          <div className="footer__contact-item">✉ support@quickcart.com</div>
        </div>
        <div className="footer__column">
          <h3 className="footer__col-title">Customer Support</h3>

          <Link to="/contact" className="footer__link">
            Contact Us
          </Link>

          <Link to="/faq" className="footer__link">
            FAQ
          </Link>

          <Link to="/shipping" className="footer__link">
            Shipping Policy
          </Link>

          <Link to="/returns" className="footer__link">
            Returns
          </Link>
        </div>

        <div className="footer__column">
          <h3 className="footer__col-title">Follow us</h3>
          <div className="footer__social">
            <a href="/" className="footer__social-icon">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a href="/" className="footer__social-icon">
              <img src={facebookIcon} alt="facebook" />
            </a>
            <a href="/" className="footer__social-icon">
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a href="/" className="footer__social-icon">
              <img src={youtubeIcon} alt="Youtube" />
            </a>
          </div>
        </div>
        <div className="footer__column">
          <h3 className="footer__col-title">Download App</h3>

          <div className="footer__app-badges">
            <a href="/" className="footer__app-badge">
              <img src={playStoreIcon} alt="PlayStore" />
              <span>Google Play</span>
            </a>

            <a href="/" className="footer__app-badge">
              <img src={appStoreIcon} alt="App Store" />
              <span>Play Store</span>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
  <p>© 2026 QuickCart. All rights reserved.</p>

  <div className="footer__payment-icons">
    <img src={visaIcon} alt="Visa" />
    <img src={mastercardIcon} alt="Mastercard" />
    <img src={upiIcon} alt="UPI" />
    
  </div>
</div>
    </footer>
  );
};

export default Footer;
