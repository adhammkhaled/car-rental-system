// routes/reservationRoutes.js

const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');


router.post('/:plateId',  reservationController.makeReservation);
router.get('checkout/:orderNo',  reservationController.getReservationDetails); 
router.put('checkout/:orderNo/cancel',  reservationController.cancelReservation); 

router.get('/reserved/:userId', reservationController.getReservedCars);


router.get('/rented/:userId', reservationController.getRentedCars);


router.post('/pickup/:orderNo', reservationController.pickupCar);


router.post('/return/:orderNo', reservationController.returnCar);

module.exports = router;