// controllers/sellerController.js
const bcrypt = require("bcryptjs");
const Seller = require("../models/Seller");
const jwt = require("jsonwebtoken");

const checkShopNameAvailability = async (req, res) => {
  const { shopName } = req.params;

  try {
    // Check if a seller with the given shop name already exists
    const existingShop = await Seller.findOne({ shopName });
    
    // If a shop with this name exists, it's not available
    if (existingShop) {
      return res.status(200).json({ available: false }); // Shop name is taken
    }
    
    // If no existing shop found, it's available
    return res.status(200).json({ available: true }); // Shop name is available
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const createSeller = async (req, res) => {
  const { sellerName, email, password, shopName, category } = req.body;

  try {
    
    const existingSeller = await Seller.findOne({ email });
    if (existingSeller) {
      return res.status(400).json({ msg: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newSeller = new Seller({
      sellerName,
      email,
      password: hashedPassword,
      shopName,
      category,
      products: [], 
    });
    
    await newSeller.save();
    
    res.status(201).json({ msg: "Seller created successfully!" });
  } catch (error) {
    res.status(500).json({ msg: "Error creating seller", error });
  }
};


const loginSeller = async (req, res) => {
  const { email, password } = req.body;

  try {
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(404).json({ msg: "Seller not found" });
    }

    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

   
    const token = jwt.sign(
      { sellerId: seller._id }, //payload
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );


    res.status(200).json({
      msg: "Login successful",
      token,
      sellerData: {
        id: seller._id,
        shopName: seller.shopName,
        category: seller.category,
        logo: seller.logo,
        products: seller.products,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};


// Add a new product for the seller
const addProduct = async (req, res) => {
  const { sellerId } = req.params; 
  const { name, images, price } = req.body;

  try {
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ msg: "Seller not found" });
    }


    seller.products.push({ name, images, price });
    await seller.save();

    res.status(201).json({ msg: "Product added successfully!", products: seller.products });
  } catch (error) {
    res.status(500).json({ msg: "Error adding product", error });
  }
};

module.exports = { createSeller, loginSeller, addProduct,checkShopNameAvailability };
