import React from 'react';
import { useSelector } from 'react-redux';

function FavsPage() {
  const favorites = useSelector((state) => state.cart.favorites);

  return (
    <div className="favorites-container">
      <h1>Your Favorites</h1>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((product) => (
            <div key={product.id} className="favorite-card">
              <img src={product.image} alt={product.name} className="favorite-image" />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no favorite products yet.</p>
      )}
    </div>
  );
}

export default FavsPage;
