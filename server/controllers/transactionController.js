// controllers/transactionController.js
const transactionModel = require('../models/transaction');

exports.pickupCar = async (req, res) => {
  try {
    const { orderNo } = req.params;
    await transactionModel.pickupCar(orderNo);
    res.status(200).json({ message: 'Car picked up successfully' });
  } catch (error) {
    console.error('Error picking up car:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.returnCar = async (req, res) => {
  try {
    const { orderNo } = req.params;
    await transactionModel.returnCar(orderNo);
    res.status(200).json({ message: 'Car returned successfully' });
  } catch (error) {
    console.error('Error returning car:', error);
    res.status(500).json({ message: 'Server error' });
  }
};