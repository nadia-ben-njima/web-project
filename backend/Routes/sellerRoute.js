const express = require("express");
const { createSeller, loginSeller} = require("../Controllers/sellerController");
const sellerRoute = express.Router();

// Route for creating a seller
sellerRoute.post("/create", createSeller);
// Seller login route
sellerRoute.post("/login", loginSeller);


module.exports = sellerRoute;
