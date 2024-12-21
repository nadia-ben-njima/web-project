import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from './CartState';
import image1 from '../assets/coquillagebo.jpg';
import image2 from '../assets/beadedbag.jpg';
import image3 from '../assets/floralbag.jpg';
import image4 from '../assets/floralearrings.jpg';
import image5 from '../assets/pearlearrings.jpg';
import CartPage from './CartPage';


function ShopPage() {
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.cart.favorites);

  const products = [
    { id: 1, name: 'Gold Earrings', category: 'Accessories', price: 50, image: image1 },
    { id: 2, name: 'Beaded Bag', category: 'Accessories', price: 30, image: image2 },
    { id: 3, name: 'Floral Bag', category: 'Accessories', price: 70, image: image3 },
    { id: 4, name: 'Floral Earrings', category: 'Accessories', price: 25, image: image4 },
    { id: 5, name: 'Pearl Earrings', category: 'Accessories', price: 40, image: image5 },
  ];
  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const toggleFavorite = (product) => {
    dispatch(cartActions.toggleFavorite(product));
  };

  const addToCart = (product) => {
    dispatch(cartActions.addItemToCart(product));
  };

  return (
    <div className="shop-container">
      <nav className="navbar">
        <button className="cart-icon">Cart</button>
      </nav>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <div className="product-actions">
              <button onClick={() => addToCart(product)} className="add-to-cart-btn">
                Add to Cart
              </button>
              <button className="favorite-btn" onClick={() => toggleFavorite(product)}>
                <i
                  className={`fa fa-heart ${
                    favorites.some((item) => item.id === product.id) ? 'active' : ''
                  }`}
                ></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopPage;
