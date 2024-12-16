import React from 'react';
import { useSelector } from 'react-redux';

const CartTotalCard = () => {
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate the subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  // Fixed shipping cost (e.g., free or flat rate)
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
      <button className="checkout-button">Proceed to checkout</button>
    </div>
  );
};

export default CartTotalCard;
