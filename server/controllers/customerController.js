const customerModel = require('../models/customer');

exports.getUserInfo = async (req, res) => {
    const custId = req.params.id;
    const userInfo = await customerModel.getUserInfo(custId);
    res.json(userInfo);
  };
  
  exports.getReadyToPickupCars = async (req, res) => {
    const custId = req.params.id;
    const cars = await customerModel.getReadyToPickupCars(custId);
    res.json(cars);
  };
  
  exports.getCurrentlyRentedCars = async (req, res) => {
    const custId = req.params.id;
    const cars = await customerModel.getCurrentlyRentedCars(custId);
    res.json(cars);
  };
  
  exports.pickupCar = async (req, res) => {
    const custId = req.params.id;
    const { orderNo } = req.params;
    await customerModel.pickupCar(orderNo, custId);
    res.json({ message: 'Car picked up successfully.' });
  };
  
  exports.returnCar = async (req, res) => {
    const custId = req.params.id;
    const { orderNo } = req.params;
    await customerModel.returnCar(orderNo, custId);
    res.json({ message: 'Car returned successfully.' });
  };