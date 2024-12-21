// models/Seller.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  images: [String],
  price: Number,
  isFinalized: { type: Boolean, default: false },
});

const sellerSchema = new mongoose.Schema({
  sellerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shopName: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  logo: { type: String },
  products: [productSchema], // Array of products
});

module.exports = mongoose.model('Seller', sellerSchema);
