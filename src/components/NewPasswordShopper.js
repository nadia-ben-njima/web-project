// NewPassword.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function NewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams(); // Get the token from the URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send the new password and token to the backend for updating the user's password
      const response = await axios.post('http://localhost:9000/api/shopper/reset-password', { token, password });

      // If successful, navigate to the sign-in page
      setMessage(response.data.message);
      setTimeout(() => {
        navigate('/signin'); // Redirect to sign-in after success
      }, 2000);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Error resetting password');
    }
  };

  useEffect(() => {
    // You can add some token validation here if necessary (for example, checking if the token is expired)
  }, [token]);

  return (
    <div className="newpassword-container">
      <div className="newpassword-box">
        <h2>Set New Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password..."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>

        {message && <p>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
}

export default NewPassword;
