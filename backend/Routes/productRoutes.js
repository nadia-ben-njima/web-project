const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// GET all products with optional filters
router.get('/products', async (req, res) => {
  const { search, category, priceMin, priceMax } = req.query;

  try {
    const filters = {};
    if (search) filters.name = { $regex: search, $options: 'i' };
    if (category) filters.category = category;
    if (priceMin) filters.price = { ...filters.price, $gte: parseInt(priceMin) };
    if (priceMax) filters.price = { ...filters.price, $lte: parseInt(priceMax) };

    const products = await Product.find(filters);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
