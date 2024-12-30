// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Pickup a car
router.post('/pickup/:orderNo', transactionController.pickupCar);

// Return a car
router.post('/return/:orderNo', transactionController.returnCar);

module.exports = router;