// routes/carRoutes.js
const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');


router.get('/available', carController.getAvailableCars); //get all cars
router.get('/:plateId', carController.getCarDetails);  //
module.exports = router;