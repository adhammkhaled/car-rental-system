// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const authMiddleware = require('../middlewares/authMiddleware');

// Protect routes with authentication middleware if needed
router.post('/', authMiddleware.verifyToken, carController.registerCar); // register new car
router.put('/:id/status', authMiddleware.verifyToken, carController.updateCarStatus); //update a car 
router.get('/available', carController.getAvailableCars); //get all cars
router.get('/:plateId', carController.getCarDetails);  //
module.exports = router;