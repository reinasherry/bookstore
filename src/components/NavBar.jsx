
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ReorderIcon from '@mui/icons-material/Reorder';
import CloseIcon from '@mui/icons-material/Close';
import '../styles/NavBar.css';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const NavBar = () => {
  const [openLinks, setOpenLinks] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
const [searchTerm, setSearchTerm] = useState('');
const [cartCount, setCartCount] = useState(0);
const [cartTotal, setCartTotal] = useState(0);
const [showCart, setShowCart] = useState(false);
  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const closeNavbar = () => {
    setOpenLinks(false);
  };

  return (
    <nav className="navbar">

      
{/* Logo / Website Name */}
<Link to="/" className="leftSide" onClick={closeNavbar}>

  <div className="logoIcon">
    <AutoStoriesOutlinedIcon />
  </div>

  <div className="brandText">
    <span className="logo">PageTurner</span>
    <span className="title">Curated Bookstore</span>
  </div>

</Link>

      
      {/* Desktop Navigation */}
      <div className="rightSide">
        <div className="desktopLinks">
  <Link to="/" className="activeLink">Home</Link>
  <Link to="/catalog">Browse Catalog</Link>
  <Link to="/services">Services & Perks</Link>
  <Link to="/about">Our Story</Link>
  <Link to="/contact">Contact & Stores</Link>
</div>
        <button
  className="searchButton"
  onClick={() => setShowSearch(!showSearch)}
  aria-label="Open search"
>
  <SearchIcon />
</button>
<Link to="/wishlist" className="wishlistButton" aria-label="Wishlist">
  <FavoriteBorderIcon />
</Link>

<button
  className="cartButton"
  onClick={() => setShowCart(!showCart)}
>
  <div className="cartIcon">
    <ShoppingBagOutlinedIcon />

    <span className="cartBadge">
      {cartCount}
    </span>
  </div>

  <span className="cartTotal">
    ${cartTotal.toFixed(2)}
  </span>
</button>
        {/* Mobile Hamburger Button */}
        <button
          className="menuButton"
          onClick={toggleNavbar}
          aria-label="Toggle navigation menu"
          aria-expanded={openLinks}
        >
          {openLinks ? <CloseIcon /> : <ReorderIcon />}
        </button>
      </div>
      {showSearch && (
  <form className="searchBar" onSubmit={(e) => e.preventDefault()}>
    <input
      type="text"
      placeholder="Search books or authors..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      autoFocus
    />

    <button type="submit">
      <SearchIcon />
    </button>
  </form>
)}
      {/* Mobile Dropdown Menu */}
      <div className={`mobileMenu ${openLinks ? 'open' : ''}`}>
        <Link to="/" onClick={closeNavbar}>Home</Link>
        <Link to="/catalog" onClick={closeNavbar}>Browse Catalog</Link>
        <Link to="/services" onClick={closeNavbar}>Services & Perks</Link>
        <Link to="/about" onClick={closeNavbar}>Our Story</Link>
        <Link to="/contact" onClick={closeNavbar}>Contact & Stores</Link>
      </div>

    </nav>
  );
};

export default NavBar;
