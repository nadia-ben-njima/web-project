import React, { useState } from 'react';
import axios from 'axios';

const CheckoutForm = ({ cartItems }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
  });
  
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.address || !formData.phoneNumber) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9000/api/checkout', {
        ...formData,
        cartItems,
        dateTime: new Date().toISOString(),
      });
      console.log('Order placed successfully:', response.data);
      setSuccessMessage('Your order has been placed successfully!'); 
      setError(''); 
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order. Please try again.');
      setSuccessMessage(''); 
    }
 
  };

  return (
    <div className="checkout-form">
      <h2>Checkout</h2>
      {error && <p className="error">{error}</p>}  
      {successMessage && <p className="success">{successMessage}</p>}  
      
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
        <input type="tel" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
