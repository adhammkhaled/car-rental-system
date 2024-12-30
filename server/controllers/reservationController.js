// controllers/reservationController.js

const reservationModel = require('../models/reservation');
const carModel = require('../models/car'); // Assuming you have a carModel
const userModel = require('../models/user'); // Assuming you have a customerModel

exports.makeReservation = async (req, res) => {
  try {
    console.log('Request params:', req.params); // Print request parameters
    const { plateId } = req.params;
    const { start_date, end_date, cust_id } = req.body;
    console.log('plate_id:', plateId);
    console.log('Start date:', start_date);
    console.log('End date:', end_date);
    console.log('Customer ID:', cust_id);

    // Check if customer exists
    const customerExists = await userModel.getUserById(cust_id);
    if (!customerExists) {
      return res.status(404).json({ message: 'Customer not found.' });
    }

    // Check if car exists and is active
    const carDetails = await carModel.getCarDetails(plateId.toString());
    console.log(carDetails);
    if (!carDetails) {
      return res.status(404).json({ message: 'Car not found or not available.' });
    }

    // Check car availability
    const isAvailable = await reservationModel.checkCarAvailability(
      plateId,
      start_date,
      end_date
    );
    if (!isAvailable) {
      return res.status(400).json({ message: 'Car is not available for the selected dates.' });
    }

    // Insert reservation
    const orderNo = await reservationModel.insertReservation(
      cust_id,
      plateId,
      start_date,
      end_date
    );

    res.status(201).json({ message: 'Reservation successful', order_no: orderNo });
  } catch (error) {
    console.error('Error making reservation:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getReservationDetails = async (req, res) => {
  try {
    const { orderNo } = req.params;
    const reservationDetails = await reservationModel.getReservationDetails(orderNo);

    if (!reservationDetails) {
      return res.status(404).json({ message: 'Reservation not found.' });
    }

    res.status(200).json(reservationDetails);
  } catch (error) {
    console.error('Error fetching reservation details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const { orderNo } = req.params;
    const custId = req.params.custId;

    const success = await reservationModel.cancelReservation(orderNo, custId);

    if (!success) {
      return res.status(400).json({ message: 'Unable to cancel reservation.' });
    }

    res.status(200).json({ message: 'Reservation cancelled successfully.' });
  } catch (error) {
    console.error('Error cancelling reservation:', error);
    res.status(500).json({ message: 'Server error' });
  }
    
};
exports.getReservedCars = async (req, res) => {
  try {
    const { userId } = req.params;
    const reservedCars = await reservationModel.getReservedCars(userId);
    res.status(200).json(reservedCars);
  } catch (error) {
    console.error('Error fetching reserved cars:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getRentedCars = async (req, res) => {
  try {
    const { userId } = req.params;
    const rentedCars = await reservationModel.getRentedCars(userId);
    res.status(200).json(rentedCars);
  } catch (error) {
    console.error('Error fetching rented cars:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.pickupCar = async (req, res) => {
  try {
    const { orderNo } = req.params;

    // First, get the plate_id for the car
    const plateId = await reservationModel.getCarPlateId(orderNo);
    if (!plateId) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Update the reservation status to 'active'
    await reservationModel.updateReservationStatus(orderNo, 'active');

    // Insert into Pickup table
    await reservationModel.insertPickup(orderNo);

    // Update the car status to 'rented'
    const statusId = await reservationModel.getCarStatusIdByName('rented');
    await reservationModel.updateCarStatus(plateId, statusId);

    res.status(200).json({ message: 'Car picked up successfully' });
  } catch (error) {
    console.error('Error picking up car:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.returnCar = async (req, res) => {
  try {
    const { orderNo } = req.params;

    // Get plate_id
    const plateId = await reservationModel.getCarPlateId(orderNo);
    if (!plateId) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Update reservation status to 'completed'
    await reservationModel.completeReservation(orderNo);

    // Update car status to 'active'
    const statusId = await reservationModel.getCarStatusIdByName('active');
    await reservationModel.updateCarStatus(plateId, statusId);

    res.status(200).json({ message: 'Car returned successfully' });
  } catch (error) {
    console.error('Error returning car:', error);
    res.status(500).json({ message: 'Server error' });
  }
};