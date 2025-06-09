const express = require('express');
const {createProduct, getAllProducts} = require('../controllers/productController');
const router = express.Router();

router.post("/createProduct", createProduct);
router.get("/getAllProducts", getAllProducts);

module.exports = router;
