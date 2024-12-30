// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');



router.get('/cars',  adminController.getAllCars);


router.post('/cars',  adminController.createCar);


router.put('/cars/:plate_id', adminController.updateCar);


router.get('/car-statuses', adminController.getAllCarStatuses);


router.get('/offices', adminController.getAllOffices);


router.get('/advanced-search',  adminController.advancedSearch);


router.get('/reports/:reportType',  adminController.generateReport);

module.exports = router;