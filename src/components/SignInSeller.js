import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const SellerSignIn = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/api/seller/login",
        userData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log("Sign-in successful:", response.data);
      setError("");

    } catch (error) {
      console.error("Error signing in:", error.response ? error.response.data : error.message);
      setError(
        error.response && error.response.data.message
          ? error.response.data.message
          : "An unexpected error occurred. Please try again."
      );
    }
  };

  return (
    <div className="signinseller-container">
      <div className="signinseller-box">
        <h2>Sign In - Seller</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>

        {error && <p className="error-message">{error}</p>}

        <p>
          {t('dont_have_account')} <Link to="/createshop">{t('create_shop_now')}</Link>
        </p>
      </div>
    </div>
  );
};

export default SellerSignIn;
