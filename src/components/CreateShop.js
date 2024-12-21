import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateShop() {
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

   
    const checkAvailability = async () => {
        if (!shopName) {
            setError(t('please_enter_shop_name'));
            return;
        }
  
        try {
            const response = await axios.get(`http://localhost:9000/api/seller/check-shop-name/${shopName}`);
            setIsShopAvailable(response.data.available); // Assuming your backend returns { available: true/false }
        } catch (err) {
            console.error('Error checking shop name availability:', err);
            setError(t('error_checking_availability'));
        }
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

        
        const shopData = {
            sellerName,
            email,
            password,
            shopName,
            category,
            logo,
        };

        try {
            const response = await axios.post("http://localhost:9000/api/seller/create", shopData);
            const { sellerData } = response.data;

            
            localStorage.setItem('shopName', sellerData.shopName);
            localStorage.setItem('category', sellerData.category);

            
            navigate('/sellerpage');
        } catch (error) {
            console.error("Error creating shop:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="create-shop-container">
            <header>
                <h1>{t('create_shop')}</h1>
                <p>{t('join_community')}</p>
            </header>

            <form className="create-shop-form" onSubmit={handleCreateClick}>
                {/* Shop Name */}
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

                {/* Seller Name */}
                <div className="form-group">
                    <label>{t('seller_name')}</label>
                    <input
                        type="text"
                        placeholder={t('enter_seller_name')}
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                    />
                </div>

                {/* Email */}
                <div className="form-group">
                    <label>{t('email_address')}</label>
                    <input
                        type="email"
                        placeholder={t('enter_email')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className="form-group">
                    <label>{t('password')}</label>
                    <input
                        type="password"
                        placeholder={t('create_password')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Confirm Password */}
                <div className="form-group">
                    <label>{t('confirm_password')}</label>
                    <input
                        type="password"
                        placeholder={t('confirm_password')}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                {/* Category Selection */}
                <div className="form-group">
                    <label>{t('main_category')}</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">{t('select_category')}</option>
                        <option value="vêtements">{t('category_clothing')}</option>
                        <option value="accessoires">{t('category_accessories')}</option>
                        <option value="artisanat">{t('category_handmade')}</option>
                    </select>
                </div>

                {/* Logo Upload */}
                <div className="form-group">
                    <label>{t('shop_logo')}</label>
                    <input type="file" onChange={handleLogoUpload} />
                    {logo && <img src={logo} alt="Shop Logo Preview" className="logo-preview" />}
                </div>

                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}

                {/* Submit Button */}
                <button type="submit" className="submit-button">
                    {t('create_shop')}
                </button>
            </form>
        </div>
    );
}

export default CreateShop;
