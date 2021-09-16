const express = require('express');
const multer = require('multer');
const {
  addProduct,
  listAllProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const uploadConfig = require('../config/upload');

const router = express.Router();
const upload = multer(uploadConfig);

router.post('/new-product', upload.array('images'), addProduct);
router.get('/products', listAllProducts);
router.put('/product/:id', upload.array('images'), updateProduct);
router.delete('/product/:id', deleteProduct);

module.exports = {
  routes: router,
};
