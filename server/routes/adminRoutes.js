// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


// Get all cars
router.get('/cars',  adminController.getAllCars);

// Create a new car
router.post('/cars',  adminController.createCar);

// Update an existing car
router.put('/cars/:plate_id', adminController.updateCar);

// Get all car statuses
router.get('/car-statuses', adminController.getAllCarStatuses);

// Get all offices
router.get('/offices', adminController.getAllOffices);

// Advanced Search
router.get('/advanced-search',  adminController.advancedSearch);

// Reports
router.get('/reports/:reportType',  adminController.generateReport);

module.exports = router;