// controllers/carController.js
const carModel = require('../models/car');

exports.registerCar = async (req, res) => {
  try {
    const { model, year, plateId, status } = req.body;

    // Insert new car
    const carId = await carModel.insertCar(model, year, plateId, status || 'active');

    res.status(201).json({ message: 'Car registered successfully', carId });
  } catch (error) {
    console.error('Error registering car:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCarStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await carModel.updateCarStatus(status, id);

    res.status(200).json({ message: 'Car status updated successfully' });
  } catch (error) {
    console.error('Error updating car status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getAvailableCars = async (req, res) => {
    try {
      const { search } = req.query; // Get the search term from query parameters
      const cars = await carModel.getAvailableCars(search);
      res.status(200).json(cars);
    } catch (error) {
      console.error('Error fetching available cars:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  exports.getCarDetails = async (req, res) => {
    try {
      const { plateId } = req.params;
  
      const carDetails = await carModel.getCarDetails(plateId);
  
      if (!carDetails) {
        return res.status(404).json({ message: 'Car not found or not available.' });
      }
  
      res.status(200).json(carDetails);
    } catch (error) {
      console.error('Error fetching car details:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };