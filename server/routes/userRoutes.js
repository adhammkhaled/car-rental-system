// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get customer name
router.get('/:id/name', userController.getCustomerName);

// Get customer info
router.get('/:id', userController.getCustomerInfo);

// Get cars ready to pickup
router.get('/:id/ready-to-pickup', userController.getReadyToPickupCars);

// Get currently rented cars
router.get('/:id/rented-cars', userController.getRentedCars);

module.exports = router;