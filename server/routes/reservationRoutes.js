// routes/reservationRoutes.js

const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect routes with authentication middleware
router.post('/:plateId',  reservationController.makeReservation); // Make a reservation
router.get('checkout/:orderNo',  reservationController.getReservationDetails); // Get reservation details
router.put('checkout/:orderNo/cancel',  reservationController.cancelReservation); // Cancel a reservation
// Get reserved cars (cars ready for pickup)
router.get('/reserved/:userId', reservationController.getReservedCars);

// Get rented cars (currently rented)
router.get('/rented/:userId', reservationController.getRentedCars);

// Pickup a car
router.post('/pickup/:orderNo', reservationController.pickupCar);

// Return a car
router.post('/return/:orderNo', reservationController.returnCar);

module.exports = router;