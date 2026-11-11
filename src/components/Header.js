import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { BookMarked, Search, Heart, ShoppingBag, Menu } from 'lucide-react'
import '../styles/Header.css'
import ThemeToggle from './Theme'

const LINKS = [
  ['/', 'Home'],
  ['/catalog', 'Browse Catalog'],
  ['/services', 'Services & Perks'],
  ['/about', 'Our Story'],
  ['/contact', 'Contact & Stores'],
]

const linkClass = (base) => ({ isActive }) => `${base} ${isActive ? 'active' : ''}`

export default function Header({ cartCount, total, wishCount, openCart, openWishlist }) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const goSearch = () => {
    navigate('/catalog')
    setTimeout(() => document.getElementById('catalog-search')?.focus(), 100)
  }

  return (
    <>
      <div className="announcement">
        Free delivery on orders over $45 with code <strong>READMORE</strong>
      </div>

      <header className="header">
        <div className="header-container">

          {/* Logo */}
          <Link to="/" className="header-logo">
            <div className="logo-icon">
              <BookMarked />
            </div>

            <div>
              <span className="logo-name">PageTurner</span>
              <span className="logo-subtitle">Bookstore</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {LINKS.map(([path, label]) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={linkClass('nav-button')}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Header Actions */}
          <div className="header-actions">

            <button onClick={goSearch} className="header-action" aria-label="Search books">
              <Search />
            </button>

            <button onClick={openWishlist} className="header-action wishlist-action" aria-label="Wishlist">
              <Heart />

              {wishCount > 0 && (
                <span className="wishlist-count">{wishCount}</span>
              )}
            </button>

            <ThemeToggle />

            <button onClick={openCart} className="cart-button" aria-label="Open cart">
              <div className="cart-icon-wrapper">
                <ShoppingBag />
                <span className="cart-count">{cartCount}</span>
              </div>

              <span className="cart-total">${total.toFixed(2)}</span>
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="mobile-menu-button"
              aria-label="Toggle menu"
            >
              <Menu />
            </button>

          </div>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="mobile-nav">
            {LINKS.map(([path, label]) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                onClick={() => setOpen(false)}
                className={linkClass('mobile-nav-button')}
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}

      </header>
    </>
  )
}