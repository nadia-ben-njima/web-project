import React from 'react';

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{item.name}</h3>
        <p>Price: ${item.price}</p>
        <p>
          Quantity:
          <button onClick={handleDecrement} className="quantity-btn">-</button>
          {item.quantity}
          <button onClick={handleIncrement} className="quantity-btn">+</button>
        </p>
      </div>
      <button onClick={() => removeFromCart(item.id)} className="remove-btn">
        Remove
      </button>
    </div>
  );
};

export default CartItem;
