import React from 'react';

export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p 
        style={{ 
          fontSize: '18px', 
          lineHeight: '1.6', 
          color: '#333', 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: '20px', 
          backgroundColor: '#f0f8ff',  
          borderRadius: '8px',  
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'  
        }}
      >
        Welcome to our website! We are an innovative and passionate team dedicated to bringing unique and handcrafted products to you. Our platform is designed to help artisans showcase their creations and provide you with a seamless shopping experience. Whether you're looking for one-of-a-kind gifts, home decor, or accessories, you'll find it here with us. Thank you for supporting handmade craftsmanship!
      </p>
    </div>
  );
}
