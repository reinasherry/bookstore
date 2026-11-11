import { Link } from 'react-router-dom'
import { BookMarked } from 'lucide-react'
import '../styles/Footer.css'

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Browse Catalog", to: "/catalog" },
  { label: "VIP Perks & Membership", to: "/services" },
  { label: "Our Story & Literacy", to: "/about" },
]

const helpLinks = [
  { label: "Contact Support", to: "/contact" },
  { label: "Store Locations", to: "/contact" },
  { label: "Shipping Policy" },
  { label: "Returns & Exchanges" },
]

const socials = [
  { label: "Instagram" },
  { label: "Twitter" },
  { label: "Facebook" },
]

function FooterLink({ label, to }) {
  return (
    <li>
      {to ? (
        <Link to={to}>{label}</Link>
      ) : (
        <a href="#" onClick={(e) => e.preventDefault()}>{label}</a>
      )}
    </li>
  )
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <div className="footer-logo">
            <BookMarked />
            <span>PageTurner</span>
          </div>

          <p>
            Your neighborhood independent bookstore online.
            Dedicated to fostering a love for reading across generations.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="footer-section">
          <h4>Quick Navigation</h4>
          <ul>
            {quickLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </ul>
        </div>

        {/* Help & Policies */}
        <div className="footer-section">
          <h4>Help & Policies</h4>
          <ul>
            {helpLinks.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4>Connect With Us</h4>

          <div className="social-links">
            {socials.map(({ label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="social-button"
                onClick={(e) => e.preventDefault()}
              >
                {label === "Facebook" ? (
                  <span className="facebook-letter">f</span>
                ) : (
                  <span>{label[0]}</span>
                )}
              </a>
            ))}
          </div>

          <p className="newsletter-text">
            Subscribe to weekly newsletter for 10% off your first order.
          </p>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        &copy; 2026 PageTurner Bookstore Inc. All rights reserved.
      </div>
    </footer>
  )
}