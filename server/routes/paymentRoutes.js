const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Get payment and reservation details
router.get('/:orderNo', paymentController.getPaymentDetails);

// Process payment
router.put('/:orderNo', paymentController.processPayment);

module.exports = router;