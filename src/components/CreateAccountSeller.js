import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function CreateAccount() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation: Check if passwords match
    if (password !== confirmPassword) {
      setError(t('passwords_do_not_match'));
      return;
    }

    // Validation: Check if all fields are filled
    if (!email || !password || !confirmPassword) {
      setError(t('please_fill_all_fields'));
      return;
    }

    const shopperData = {
      email,
      password,
    };

    try {
      // Send POST request to register the shopper
      const response = await axios.post('http://localhost:9000/api/shopper/register', shopperData, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 201) {
        setSuccessMessage(t('account_created_successfully'));
        setError('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setError(err.response?.data?.msg || t('error_creating_account'));
    }
  };

  return (
    <div className="createaccount-container">
      <div className="createaccount-box">
        <h2>{t('sign_up')}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder={t('email_placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={t('password_placeholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder={t('repeat_password_placeholder')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">{t('sign_up')}</button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
