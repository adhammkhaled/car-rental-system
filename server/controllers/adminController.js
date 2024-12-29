// controllers/adminController.js

const carModel = require('../models/car');
const officeModel = require('../models/office'); 
const carStatusModel = require('../models/carStatus');
const customerModel = require('../models/customer');
const reservationModel = require('../models/reservation');
const paymentModel = require('../models/payment');


exports.getAllCars = async (req, res) => {
  try {
    const cars = await carModel.getAllCars();
    res.json(cars);
  } catch (error) {
    console.error('Error fetching all cars:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.createCar = async (req, res) => {
  try {
    const carData = req.body;
    await carModel.createCar(carData);
    res.status(201).json({ message: 'Car created successfully.' });
  } catch (error) {
    console.error('Error creating car:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.updateCar = async (req, res) => {
  try {
    const { plate_id } = req.params;
    const carData = req.body;
    await carModel.updateCar(plate_id, carData);
    res.json({ message: 'Car updated successfully.' });
  } catch (error) {
    console.error('Error updating car:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.getAllCarStatuses = async (req, res) => {
    try {
      const statuses = await carStatusModel.getAllCarStatuses();
      res.json(statuses);
    } catch (error) {
      console.error('Error fetching car statuses:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  };
  
  exports.getAllOffices = async (req, res) => {
    try {
      const offices = await officeModel.getAllOffices();
      res.json(offices);
    } catch (error) {
      console.error('Error fetching offices:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  };

  exports.advancedSearch = async (req, res) => {
    const { searchTerm } = req.query;
    try {
      const results = await reservationModel.advancedSearch(searchTerm);
      res.json(results);
    } catch (error) {
      console.error('Error performing advanced search:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  };
  
  exports.generateReport = async (req, res) => {
    const { reportType } = req.params;
    const params = req.query;
  
    try {
      let results;
      switch (reportType) {
        case 'reservations_by_period':
          results = await reservationModel.getReservationsByPeriod(params);
          break;
        case 'reservations_by_car':
          results = await reservationModel.getReservationsByCar(params);
          break;
        case 'car_status_by_day':
          results = await carModel.getCarStatusByDay(params);
          break;
        case 'reservations_by_customer':
          results = await reservationModel.getReservationsByCustomer(params);
          break;
        case 'daily_payments':
          results = await paymentModel.getDailyPayments(params);
          break;
        default:
          return res.status(400).json({ message: 'Invalid report type.' });
      }
      res.json(results);
    } catch (error) {
      console.error('Error generating report:', error);
      res.status(500).json({ message: 'Server error.' });
    }
  };
