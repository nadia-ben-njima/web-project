const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    images: [String],
    price: Number,
    isFinalized: Boolean
});

const shopSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    shopName: String,
    category: String,
    logo: String,
    items: [itemSchema]
});

module.exports = mongoose.model('Shop', shopSchema);
