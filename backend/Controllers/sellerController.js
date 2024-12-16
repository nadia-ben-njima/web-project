const bcrypt = require("bcryptjs");
const Seller = require("../models/Seller");



// Create a new seller
const createSeller = async (req, res) => {
  const { sellerName, email, password, shopName, category, logo } = req.body;

  try {
    // Check if email or shop name already exists
    const existingSeller = await Seller.findOne({ $or: [{ email }, { shopName }] });
    if (existingSeller) {
      return res.status(400).json({ msg: "Email or Shop Name already taken." });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new seller
    const newSeller = new Seller({
      sellerName,
      email,
      password: hashedPassword,
      shopName,
      category,
      logo, 
    });

    // Save the seller
    await newSeller.save();
    res.status(201).json({ msg: "Seller created successfully!", seller: newSeller });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error creating seller" });
  }
};

const loginSeller = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find seller by email
    const seller = await Seller.findOne({ email });
    if (!seller) {
      return res.status(404).json({ msg: "Seller not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, seller.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    res.status(200).json({ msg: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
};

module.exports = { createSeller, loginSeller };
