// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/:id/name', userController.getCustomerName);


router.get('/:id', userController.getCustomerInfo);


router.get('/:id/ready-to-pickup', userController.getReadyToPickupCars);


router.get('/:id/rented-cars', userController.getRentedCars);

module.exports = router;