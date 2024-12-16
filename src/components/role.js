import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import buyerImage from '/Users/bennjimanadia/mon-ecommerce/src/buyer.png';
import shopImage from '/Users/bennjimanadia/mon-ecommerce/src/shop.png';
import { useTranslation } from 'react-i18next';

function Role() {
  const { t } = useTranslation();
  const navigate = useNavigate(); // Initialize the navigate hook

  // Function to handle navigation for the Buyer button
  const handleBuyerClick = () => {
    navigate('/signinbuyer'); // Redirect to the SignIn page
  };

  // Function to handle navigation for the Seller button (if needed)
  const handleSellerClick = () => {
    // Add navigation logic for the seller button, e.g., navigate('/seller-signup');
    navigate('/signinseller');
  };

  return (
    <div className="role-container">
      <div className="role-images-container">
        {/* Buyer Card */}
        <div className="role-card">
          <img src={buyerImage} alt="Buyer" className="role-image" />
          <button className="role-button" onClick={handleBuyerClick}>
            {t('role_buyer')}
          </button>
        </div>

        {/* Seller Card */}
        <div className="role-card">
          <img src={shopImage} alt="Shop" className="role-image" />
          <button className="role-button" onClick={handleSellerClick}>
            {t('role_seller')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Role;
