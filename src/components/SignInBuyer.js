import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios'; // Import axios for making API requests

function SignInBuyer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      // Send POST request to your backend API to handle sign-in
      const response = await axios.post('http://localhost:9000/api/shopper/login', userData);
      console.log('Sign-in successful:', response.data);
      // Handle the response or redirect user to another page after successful sign-in
    } catch (error) {
      console.error('Error signing in:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="signinbuyer-container">
      <div className="signinbuyer-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>

        <p>
          You don't have an account?{' '}
          <Link to="/createaccount">Join us now</Link> {/* Link to the create account page */}
        </p>
      </div>
    </div>
  );
}

export default SignInBuyer;
