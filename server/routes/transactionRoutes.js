// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');


router.post('/pickup/:orderNo', transactionController.pickupCar);


router.post('/return/:orderNo', transactionController.returnCar);

module.exports = router;