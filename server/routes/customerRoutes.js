const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/info/:id', customerController.getUserInfo);
router.get('/ready-to-pickup/:id', customerController.getReadyToPickupCars);
router.get('/currently-rented/:id', customerController.getCurrentlyRentedCars);
router.post('/pickup/:orderNo/:id', customerController.pickupCar);
router.post('/return/:orderNo/:id', customerController.returnCar);

module.exports = router;