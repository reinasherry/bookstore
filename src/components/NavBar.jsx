import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookMarked, Search, Heart, ShoppingBag, Menu } from 'lucide-react';
import '../styles/NavBar.css'; 

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Placeholder states for badges
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Browse Catalog', path: '/catalog' },
    { name: 'Services & Perks', path: '/services' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact & Stores', path: '/contact' },
  ];

  const handleSearchClick = () => {
    navigate('/catalog');
    setTimeout(() => {
      document.getElementById('catalog-search')?.focus();
    }, 100);
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="header-top">
          
          {/* Logo */}
          <Link to="/" className="header-logo">
            <div className="logo-icon-wrapper">
              <BookMarked size={24} />
            </div>
            <div>
              <span className="logo-text">PageTurner</span>
              <span className="logo-subtext">Curated Bookstore</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="header-actions">
            <button onClick={handleSearchClick} className="icon-btn" title="Search Books">
              <Search size={20} />
            </button>

            <button className="icon-btn" title="Wishlist">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="badge badge-rose">{wishlistCount}</span>
              )}
            </button>

            <button className="cart-btn">
              <div className="cart-icon-wrapper">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="badge badge-amber">{cartCount}</span>
                )}
              </div>
              <span className="cart-total">$0.00</span>
            </button>

            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="mobile-menu-btn"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`mobile-nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default NavBar;