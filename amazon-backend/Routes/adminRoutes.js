const express = require('express');
const { createVendor } = require('../Controllers/adminController');
const { verifyToken, restrictTo } = require('../Middlewares/authMiddleware'); 
const router = express.Router();
const vendorController = require('../Controllers/VendorController');

router.post('/create-vendor', verifyToken, restrictTo(['admin']), createVendor);

module.exports = router;