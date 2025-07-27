const express = require('express');
const { createProduct } = require('../Controllers/vendorController');
const { verifyToken, restrictTo } = require('../Middlewares/authMiddleware');
const router = express.Router();

router.post('/add-product', verifyToken, restrictTo(['vendor']), createProduct);

module.exports = router;