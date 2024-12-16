import React from "react";
import { Link } from "react-router-dom";
import "/Users/bennjimanadia/mon-ecommerce/src/ClothingPage.css?version=1";


// Import images
import imgSdresses from "/Users/bennjimanadia/mon-ecommerce/src/assets/dress5.jpg";
import imgEdresses from "/Users/bennjimanadia/mon-ecommerce/src/assets/dress3.jpg";
import imgTops from "/Users/bennjimanadia/mon-ecommerce/src/assets/blouse2.jpg";
import imgJackets from "/Users/bennjimanadia/mon-ecommerce/src/assets/clothing4.jpg";
import imgSets from "/Users/bennjimanadia/mon-ecommerce/src/assets/set2.jpg";
import imgBoots from "/Users/bennjimanadia/mon-ecommerce/src/assets/boots1.jpg";
import imgSneakers from "/Users/bennjimanadia/mon-ecommerce/src/assets/sneakers1.jpg";
import imgHighHeels from "/Users/bennjimanadia/mon-ecommerce/src/assets/shoes1.jpg";

const Clothing = () => {
  const subcategories = [
    { name: "Summer dresses", imgSrc: imgSdresses, link: "/sdresses" },
    { name: "Evening dresses", imgSrc: imgEdresses, link: "/edresses" },
    { name: "Tops & Blouses", imgSrc: imgTops, link: "/tops" },
    { name: "Jackets & Coats", imgSrc: imgJackets, link: "/jackets" },
    { name: "Sets", imgSrc: imgSets, link: "/sets" },
    { name: "Boots", imgSrc: imgBoots, link: "/boots" },
    { name: "Sneakers", imgSrc: imgSneakers, link: "/sneakers" },
    { name: "High heels", imgSrc: imgHighHeels, link: "/highheels" },
  ];

  return (
    <div className="clothing-page">
      <h2>Clothing</h2>
      
      
      <p></p>
      <div className="carousel-container2">
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

export default Clothing;
