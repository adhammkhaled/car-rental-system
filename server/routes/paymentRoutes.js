const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');


router.get('/:orderNo', paymentController.getPaymentDetails);


router.put('/:orderNo', paymentController.processPayment);

module.exports = router;