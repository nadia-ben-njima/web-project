const express = require('express');
const { registerShopper, loginShopper } = require('../Controllers/shopperController'); // Ensure these functions exist
const shopperRoute = express.Router();

// Shopper Registration Route
shopperRoute.post('/register', registerShopper); // Ensure registerShopper is defined in shopperController

// Shopper Login Route
shopperRoute.post('/login', loginShopper); // Ensure loginShopper is defined in shopperController

module.exports = shopperRoute;
