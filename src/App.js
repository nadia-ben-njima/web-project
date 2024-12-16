import React, { useState } from 'react';
import logo from './assets/logo.png';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'; 
import './i18n'; 
import Navbar from './components/Navbar';
import LanguageSwitcher from './components/LanguageSwitcher';
import Clothing from './components/Clothing';
import Accessories from './components/AccessoriesPage';
import About from './components/AboutUs';
import SignIn from './components/SignIn';
import Role from './components/role';
import Createaccount from './components/CreateAccountSeller';
import CreateShop from './components/CreateShop';
import ShopPage from './components/ShopPage';
import CartPage from './components/CartPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './components/CartState';
import FavsPage from './components/favs';
import AccessoriesPage from './components/AccessoriesPage';
import SellerPage from './components/SellerPage';
import SignInBuyer from '/Users/bennjimanadia/mon-ecommerce/src/components/SignInBuyer.js'
import SignInSeller from './components/SignInSeller';

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});


function App() {
  // Shared state for shop details
  const [shopDetails, setShopDetails] = useState({});

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Navbar />
            <LanguageSwitcher />
          </header>
          <Routes>
            <Route path="/" element={<ShopPage />} />
            {/* Pass state setters and data as props */}
            <Route
              path="/createshop"
              element={<CreateShop setShopDetails={setShopDetails} />}
            />
            <Route
              path="/sellerpage"
              element={<SellerPage shopDetails={shopDetails} />}
            />
            <Route path="/clothing" element={<Clothing />} />
            <Route path="/accessories" element={<AccessoriesPage />} />
            <Route path="/about_us" element={<About />} />
            <Route path="/signup" element={<SignIn />} />
            <Route path="/role" element={<Role />} />
            <Route path="/createaccount" element={<Createaccount />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/signinbuyer" element={<SignInBuyer />} />
            <Route path="/signinseller" element={<SignInSeller />} />
            <Route path="/favorites" element={<FavsPage />} />
            <Route path="/createshop" element={<CreateShop />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
