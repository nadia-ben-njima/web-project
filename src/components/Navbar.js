import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items); // Get the cart items from Redux state

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleFavoritesClick = () => {
    navigate('/favorites');
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate the total number of items in the cart

  return (
    <nav className="topnav">
      <div className="search-container">
        <Link to="/">
        <img src={logo} className="App-logo" width={100} height={100} alt="logo" />
        </Link>
        <div className="search-input-wrapper">
          <button className="search-button">
            <i className="fa fa-search"></i>
          </button>
          <input type="text" placeholder={t('Search')} />
        </div>

        <Link to="/role" className="nav-link">{t('signin')}</Link>
        <i className="fa fa-heart nav-icon" onClick={handleFavoritesClick}></i>
        
        {/* Cart Icon with Badge */}
        <div className="cart-icon-wrapper" onClick={handleCartClick}>
          <i className="fa fa-shopping-cart nav-icon"></i>
          {itemCount > 0 && (
            <div className="cart-item-count">
              {itemCount}
            </div>
          )}
        </div>
      </div>

      <ul className="nav-links">
        <Link to="/clothing" aria-label="Clothing Category">{t('clothing')}</Link>
        <Link to="/accessories" aria-label="Accessories Category">{t('accessories')}</Link>
        <Link to="/about_us" aria-label="About Us Page">{t('about_us')}</Link>
      </ul>
    </nav>
  );
};

export default Navbar;