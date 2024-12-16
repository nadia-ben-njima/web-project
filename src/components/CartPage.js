import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { cartActions } from './CartState';
import CartTotalCard from '/Users/bennjimanadia/mon-ecommerce/src/components/CardTotalCard.js';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const removeFromCart = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const updateQuantity = (id, newQuantity) => {
    dispatch(cartActions.updateItemQuantity({ id, newQuantity }));
  };

  return (
    <div className="cart-page">
      <h1>Your Shopping Cart</h1>
      <div className="cart-items">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <CartTotalCard />
    </div>
  );
};

export default CartPage;
