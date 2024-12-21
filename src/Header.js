import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import axios from 'axios';
import SellerNavbar from './SellerNavbar'; // Seller Navbar Component
import Navbar from './Navbar'; // Shopper Navbar Component

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux
  const [userRole, setUserRole] = useState(null); // Store user role
  const [searchQuery, setSearchQuery] = useState('');
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Cart item count

  // Function to fetch user profile and determine role
  const fetchUserProfile = async () => {
    try {
      // First try fetching from the /api/seller endpoint
      const sellerResponse = await axios.get('/api/seller');
      const sellerProfile = sellerResponse.data;

      if (sellerProfile && sellerProfile.shopName) {
        setUserRole('seller'); // User is a seller
        return; // No need to check further if they are a seller
      }

      // If the seller profile doesn't exist, try fetching from the /api/shopper endpoint
      const shopperResponse = await axios.get('/api/shopper');
      const shopperProfile = shopperResponse.data;

      if (shopperProfile) {
        setUserRole('shopper'); // User is a shopper
      }

    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUserRole('shopper'); // Default to shopper if both fetches fail
    }
  };

  // Fetch user profile on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Conditionally render the correct Navbar based on user role
  if (userRole === null) {
    return <div>Loading...</div>; // Optional: Show a loading state while fetching the profile
  }

  if (userRole === 'seller') {
    return <SellerNavbar cartItems={cartItems} searchQuery={searchQuery} setSearchQuery={setSearchQuery} itemCount={itemCount} />;
  } else {
    return <Navbar cartItems={cartItems} searchQuery={searchQuery} setSearchQuery={setSearchQuery} itemCount={itemCount} />;
  }
};

export default Header;
