// controllers/reservationController.js

const reservationModel = require('../models/reservation');
const carModel = require('../models/car'); // Assuming you have a carModel
const customerModel = require('../models/customer'); // Assuming you have a customerModel

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
    const customerExists = await customerModel.getCustomerById(cust_id);
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
    const custId = req.user.id; // Assuming user ID is set in req.user after authentication

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