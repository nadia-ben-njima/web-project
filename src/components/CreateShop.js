import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateShop({ setShopDetails }) {
  const { t } = useTranslation();
  const [shopName, setShopName] = useState('');
  const [isShopAvailable, setIsShopAvailable] = useState(null);
  const [category, setCategory] = useState('');
  const [logo, setLogo] = useState(null);
  const [sellerName, setSellerName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const checkAvailability = () => {
    setIsShopAvailable(shopName.length > 0 && shopName !== 'MyShop'); // Example logic
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError(t('invalid_logo_type'));
    }
  };

  const handleCreateClick = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError(t('passwords_do_not_match'));
      return;
    }

    if (!shopName || !category || !sellerName || !email || !password) {
      setError(t('please_fill_all_fields'));
      return;
    }

    // Prepare data to be sent to the backend
    const shopData = {
      sellerName,
      email,
      password,
      shopName,
      category,
      logo,
    };

    try {
      // Make POST request to backend to create the shop
      const response = await axios.post('http://localhost:9000/api/seller/create', shopData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        // If shop is created successfully, navigate to the seller page
        setShopDetails(shopData);
        navigate('/sellerpage');
      }
    } catch (error) {
      // Check if the error response exists and show appropriate message
      if (error.response) {
        setError(error.response.data.msg || t('error_creating_shop'));
      } else {
        setError(t('error_creating_shop'));
      }
      console.error('Error creating shop:', error);
    }
  };

  return (
    <div className="create-shop-container">
      <header>
        <h1>{t('create_shop')}</h1>
        <p>{t('join_community')}</p>
      </header>

      <form className="create-shop-form" onSubmit={handleCreateClick}>
        <div className="form-group">
          <label>{t('shop_name')}</label>
          <input
            type="text"
            placeholder={t('enter_shop_name')}
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
          />
          <button type="button" onClick={checkAvailability}>
            {t('check_availability')}
          </button>
          {isShopAvailable !== null && (
            <p>{isShopAvailable ? t('name_available') : t('name_taken')}</p>
          )}
        </div>

        <div className="form-group">
          <label>{t('seller_name')}</label>
          <input
            type="text"
            placeholder={t('enter_seller_name')}
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>{t('email_address')}</label>
          <input
            type="email"
            placeholder={t('enter_email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>{t('password')}</label>
          <input
            type="password"
            placeholder={t('create_password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>{t('confirm_password')}</label>
          <input
            type="password"
            placeholder={t('confirm_password')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>{t('main_category')}</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">{t('select_category')}</option>
            <option value="vêtements">{t('category_clothing')}</option>
            <option value="accessoires">{t('category_accessories')}</option>
            <option value="artisanat">{t('category_handmade')}</option>
          </select>
        </div>

        <div className="form-group">
          <label>{t('shop_logo')}</label>
          <input type="file" onChange={handleLogoUpload} />
          {logo && <img src={logo} alt="Shop Logo Preview" className="logo-preview" />}
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

        <button
          type="submit" // Removed the onClick handler
          className="submit-button"
        >
          {t('create_shop')}
        </button>
      </form>
    </div>
  );
}

export default CreateShop;
