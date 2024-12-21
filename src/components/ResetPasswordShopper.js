// ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios'; // For making API requests
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // For navigation after successful request

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the request to the backend to trigger the password reset process
      const response = await axios.post('http://localhost:9000/api/shopper/request-password-reset', { email });
      
      // If successful, notify the user and reset the form
      setMessage(response.data.message);
      setEmail(''); // Clear the email field
    } catch (error) {
      // If there's an error, display it
      setError(error.response ? error.response.data.message : 'Error sending password reset email');
    }
  };

  return (
    <div className="resetpassword-container">
      <div className="resetpassword-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Reset Link</button>
        </form>

        {message && <p>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <p>
          Remembered your password?{' '}
          <Link to="/signin">Sign in</Link> {/* Link to sign-in page */}
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
