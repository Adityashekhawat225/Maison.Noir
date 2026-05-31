import {
  FaInstagram,FaFacebookF,FaPinterestP,FaYoutube,} from "react-icons/fa";

import "../Styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">

      <div className="footer-top">

        <div className="footer-box">
          <h4>HELP</h4>
          <p>Customer Care</p>
          <p>FAQs</p>
          <p>Shipping & Delivery</p>
          <p>Returns</p>
          <p>Track Order</p>
        </div>

        <div className="footer-box">
          <h4>COLLECTIONS</h4>
          <p>Women</p>
          <p>Men</p>
          <p>Bags & Wallets</p>
          <p>Perfumes</p>
          <p>Watches</p>
        </div>

        <div className="footer-box">
          <h4>MAISON.NOIR</h4>
          <p>About Us</p>
          <p>Luxury Story</p>
          <p>Careers</p>
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
        </div>

        <div className="footer-box newsletter">

          <h4>CONNECT</h4>

          <p>
            Join Maison.Noir and receive exclusive launches,
            luxury updates and new collections.
          </p>

          <div className="newsletter-box">
            <input
              type="email"
              placeholder="Enter your email"
            />

            <button>Join</button>
          </div>

          <div className="socials">

            <FaInstagram />
            <FaFacebookF />
            <FaPinterestP />
            <FaYoutube />

          </div>

        </div>

      </div>


      <div className="footer-bottom">

        <p>🇮🇳 India</p>

        <h2>MAISON.NOIR</h2>

        <p>© 2026 Maison.Noir. All Rights Reserved.</p>

      </div>

    </footer>
  );
}