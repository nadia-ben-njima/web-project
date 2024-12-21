import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './components/CartState';
import SellerNavbar from './components/SellerNavbar';
import Navbar from './components/Navbar';
import LanguageSwitcher from './components/LanguageSwitcher';
import ShopPage from './components/ShopPage';
import CreateShop from './components/CreateShop';
import SellerPage from './components/SellerPage';
import Clothing from './components/Clothing';
import AccessoriesPage from './components/AccessoriesPage';
import About from './components/AboutUs';
import SignIn from './components/SignIn';
import Role from './components/role';
import CreateAccount from './components/CreateAccountSeller';
import CartPage from './components/CartPage';
import FavsPage from './components/favs';
import SignInBuyer from './components/SignInBuyer';
import SignInSeller from './components/SignInSeller';
import SearchPage from './components/SearchPage';
import axios from 'axios';
import './App.css';
import './i18n';
import CheckoutForm from './components/CheckoutForm';
import ResetPassword from './components/ResetPasswordShopper';
import NewPassword from './components/NewPasswordShopper';
import BuyerNavbar from './components/BuyerNavbar';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

function App() {
  const [shopDetails, setShopDetails] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Fetch user role from the API
  const fetchUserRole = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/shopper-or-seller');
      if (response.data.shopName) {
        setUserRole('seller');
      } else {
        setUserRole('shopper');
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  useEffect(() => {
    fetchUserRole();
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <header className="App-header">
              <MainNavbar userRole={userRole} />
              <LanguageSwitcher />
            </header>
            <Routes>
              <Route path="/" element={<ShopPage />} />
              <Route path="/createshop" element={<CreateShop setShopDetails={setShopDetails} />} />
              <Route path="/sellerpage" element={<SellerPage shopDetails={shopDetails} />} />
              <Route path="/clothing" element={<Clothing />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route path="/about_us" element={<About />} />
              <Route path="/signup" element={<SignIn />} />
              <Route path="/role" element={<Role />} />
              <Route path="/createaccount" element={<CreateAccount />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/signinbuyer" element={<SignInBuyer />} />
              <Route path="/signinseller" element={<SignInSeller />} />
              <Route path="/favorites" element={<FavsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/reset-password/:token" element={<NewPassword />} />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

//Conditionally Rendering
const MainNavbar = ({ userRole }) => {
  if (userRole === 'seller') {
    return <SellerNavbar />;
  } else if (userRole === 'shopper') {
    return <BuyerNavbar />;
  
  } 
  else{
    return<Navbar/>
  }
};

export default App;
