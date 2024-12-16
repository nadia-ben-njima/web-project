const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  ShopName:String,
  image: String, // URL to image
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
