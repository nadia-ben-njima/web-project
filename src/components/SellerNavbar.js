import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const SellerNavbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      navigate(`/search?q=${query}`);
    }
  };

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
        <Link to="/sellerpage" className="nav-link">{t('Profile')}</Link>

        {/* Notifications Icon */}
        <Link to="/order-requests" className="nav-link">
          <i className="fa fa-bell nav-icon"></i>
        </Link>

        {/* Order History Icon */}
        <Link to="/order-history" className="nav-link">
          <i className="fa fa-history nav-icon"></i>
        </Link>

      </div>
    </nav>
  );
};

export default SellerNavbar;
