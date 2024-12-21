import { useSelector } from 'react-redux';
import CheckoutForm from './CheckoutForm';
import React, { useEffect, useState } from "react";

const CartTotalCard = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);

  
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


  const shippingCost = 0;

  return (
    <div className="cart-total-card">
      <h2>Cart Total</h2>
      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${(subtotal + shippingCost).toFixed(2)}</span>
        </div>
      </div>
      {!isCheckoutVisible ? (
        <button className="checkout-button" onClick={() => setCheckoutVisible(true)}>
          Proceed to checkout
        </button>
      ) : (
        <CheckoutForm cartItems={cartItems} />
      )}
    </div>
  );
};

export default CartTotalCard;
