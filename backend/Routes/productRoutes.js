
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const productController = require('../Controllers/productController');

// Create a product (with image upload)
router.post('/create', upload.single('image'), productController.createProduct);


router.get('/', productController.getProducts);


router.get('/:productId', productController.getProductById);


router.put('/:productId', productController.updateProduct);


router.delete('/:productId', productController.deleteProduct);

module.exports = router;
