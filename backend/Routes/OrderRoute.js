const express = require('express');
const { postOrder } = require('../Controllers/orderController'); 
const router = express.Router();


router.post('/checkout', postOrder); 


module.exports = router;
