import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import image1 from '../assets/coquillagebo.jpg';
import image2 from '../assets/beadedbag.jpg';
import image3 from '../assets/floralbag.jpg';
import image4 from '../assets/floralearrings.jpg';
import image5 from '../assets/pearlearrings.jpg';

const SearchPage = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const query = new URLSearchParams(useLocation().search).get('q'); // Extract the search query from the URL

  const products = [
    { id: 1, name: 'Gold Earrings', category: 'Accessories', price: 50, image: image1 },
    { id: 2, name: 'Beaded Bag', category: 'Accessories', price: 30, image: image2 },
    { id: 3, name: 'Floral Bag', category: 'Accessories', price: 70, image: image3 },
    { id: 4, name: 'Floral Earrings', category: 'Accessories', price: 25, image: image4 },
    { id: 5, name: 'Pearl Earrings', category: 'Accessories', price: 40, image: image5 },
  ];

  useEffect(() => {
    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // If no query, show all products
    }
  }, [query]); // Re-run when the query changes

  return (
    <div className="product-grid">
      {filteredProducts.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
