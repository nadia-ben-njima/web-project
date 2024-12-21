import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const BuyerNavbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder={t('Search')}
          />
        </div>

        {/* Profile Icon */}
        <Link to="/profile" className="nav-link">{t('Profile')}</Link>

        {/* Sign In Link */}
        <Link to="/role" className="nav-link">{t('signin')}</Link>

      {/* Cart Icon with Badge */}
      <div className="cart-icon-wrapper" onClick={() => navigate('/cart')}>
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

export default BuyerNavbar;
