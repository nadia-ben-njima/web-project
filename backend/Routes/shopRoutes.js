const express = require('express');
const router = express.Router();
const Shop = require('../models/Shop');

// Get shop details by user ID
router.get('/:userId', async (req, res) => {
    try {
        const shop = await Shop.findOne({ userId: req.params.userId });
        res.json(shop);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update shop details and items
router.put('/:id', async (req, res) => {
    try {
        const updatedShop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedShop);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
