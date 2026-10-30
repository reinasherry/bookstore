
import { Link } from 'react-router-dom';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">

        {/* Brand */}
        <div className="footerBrand">
          <div className="footerLogo">
            <AutoStoriesOutlinedIcon />
            <span>PageTurner</span>
          </div>

          <p>
            Your neighborhood independent bookstore online.
            Dedicated to fostering a love for reading across generations.
          </p>
        </div>

        {/* Quick Navigation */}
        <div>
          <h4>Quick Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/catalog">Browse Catalog</Link></li>
            <li><Link to="/services">VIP Perks & Membership</Link></li>
            <li><Link to="/about">Our Story & Literacy</Link></li>
          </ul>
        </div>

        {/* Help & Policies */}
        <div>
          <h4>Help & Policies</h4>
          <ul>
            <li><Link to="/contact">Contact Support</Link></li>
            <li><Link to="/contact">Store Locations</Link></li>
            <li><a href="#shipping">Shipping Policy</a></li>
            <li><a href="#returns">Returns & Exchanges</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4>Connect With Us</h4>

          <div className="socialLinks">
            <a href="#instagram" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="#twitter" aria-label="Twitter">
              <XIcon />
            </a>
            <a href="#facebook" aria-label="Facebook">
              <FacebookIcon />
            </a>
          </div>

          <p>
            Subscribe to our weekly newsletter for 10% off your first order.
          </p>
        </div>

      </div>

      {/* Copyright */}
      <div className="footerBottom">
        &copy; 2026 PageTurner Bookstore Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
