import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext'; 

const SignInSeller = () => {
    const { t } = useTranslation();
    const { login } = useAuth(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrorMessage] = useState("");
    const navigate = useNavigate();

    
    const handleLogin = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post('http://localhost:9000/api/seller/login', { email, password });
            const { token, sellerData } = response.data;

            
            localStorage.setItem('token', token);
            localStorage.setItem('userId', sellerData.id); 
            localStorage.setItem('shopName', sellerData.shopName); 
            localStorage.setItem('category', sellerData.category); 
            localStorage.setItem('logo', sellerData.logo); 

            
           

            
            navigate('/sellerpage'); 
        } catch (error) {
            console.error("Login error:", error.response ? error.response.data.msg : error.message);
            setErrorMessage(error.response ? error.response.data.msg : "An error occurred. Please try again."); // Set error message for display
        }
    };

    
    const handleSubmit = (e) => {
        e.preventDefault(); 
        setErrorMessage(""); 
        handleLogin(e); 
    };

    return (
        <div className="signinseller-container">
            <div className="signinseller-box">
                <h2>{t('sign_in')} - {t('seller')}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder={t('enter_your_email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder={t('enter_your_password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">{t('sign_in')}</button>
                </form>

                {error && <p className="error-message">{error}</p>} 

                <p>
                    {t('dont_have_account')} <Link to="/createshop">{t('create_shop_now')}</Link>
                </p>
            </div>
        </div>
    );
};

export default SignInSeller;
