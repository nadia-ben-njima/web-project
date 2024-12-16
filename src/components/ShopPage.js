import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from './CartState';
import axios from 'axios'; // Import axios for API calls

function ShopPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.cart.favorites);

  // State to store products fetched from the database
  const [products, setProducts] = useState([]);

  // Fetch products from the backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products'); // API endpoint to fetch products
        setProducts(response.data); // Update the products state with data from the server
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

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
          <div key={product._id} className="product-card"> {/* Use `_id` from MongoDB */}
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
                    favorites.some((item) => item._id === product._id) ? 'active' : ''
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
