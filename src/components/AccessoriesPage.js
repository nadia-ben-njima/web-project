import React from "react";
import { Link } from "react-router-dom";
import "/Users/bennjimanadia/mon-ecommerce/src/AccessoriesPage.css";

// Import images
import imgWatches from "/Users/bennjimanadia/mon-ecommerce/src/assets/watch0.jpg";
import imgRings from "/Users/bennjimanadia/mon-ecommerce/src/assets/ring6.jpg";
import imgNecklaces from "/Users/bennjimanadia/mon-ecommerce/src/assets/collier1.jpg";
import imgEarrings from "/Users/bennjimanadia/mon-ecommerce/src/assets/pearlearrings.jpg";
import imgScarves from "/Users/bennjimanadia/mon-ecommerce/src/assets/scarve1.jpg";
import imgBrooches from "/Users/bennjimanadia/mon-ecommerce/src/assets/brooch4.jpg";
import imgPhonecases from "/Users/bennjimanadia/mon-ecommerce/src/assets/phonecase9.jpg";

const AccessoriesPage = () => {
  const subcategories = [
    { name: "Watches", imgSrc: imgWatches, link: "/watches" },
    { name: "Rings", imgSrc: imgRings, link: "/rings" },
    { name: "Necklaces", imgSrc: imgNecklaces, link: "/necklaces" },
    { name: "Earrings", imgSrc: imgEarrings, link: "/earrings" },
    { name: "Scarves", imgSrc: imgScarves, link: "/scarves" },
    { name: "Brooches", imgSrc: imgBrooches, link: "/brooches" },
    { name: "Phonecases", imgSrc: imgPhonecases, link: "/phonecases" },
  ];

  return (
    <div className="accessories-page">
      <h2>Accessories</h2>
      
      
      <p></p>
      <div className="carousel-container">
        <div className="carousel">
          {[...subcategories, ...subcategories].map((category, index) => (
            <Link to={category.link} key={index} className="subcategory">
              <img src={category.imgSrc} alt={category.name} />
              <p>{category.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessoriesPage;
