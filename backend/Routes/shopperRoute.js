const express = require('express');
const { registerShopper, loginShopper ,resetPassword,requestPasswordReset} = require('../Controllers/shopperController');
const shopperRoute = express.Router();


shopperRoute.post('/register', registerShopper); 


shopperRoute.post('/login', loginShopper); 
shopperRoute.post('/request-password-reset',requestPasswordReset);

shopperRoute.post('/reset-password',resetPassword);
module.exports = shopperRoute;
