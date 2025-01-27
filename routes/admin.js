const path = require('path');
const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

router.get('/products', adminController.getProducts);
router.post('/add-product', adminController.postProduct);


module.exports = router;
