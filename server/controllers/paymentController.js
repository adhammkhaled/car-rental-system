const paymentModel = require('../models/payment');

exports.getPaymentDetails = async (req, res) => {
  const { orderNo } = req.params;

  try {
    const paymentDetails = await paymentModel.getPaymentDetails(orderNo);

    if (!paymentDetails) {
      return res.status(404).json({ message: 'Payment details not found.' });
    }

    res.json(paymentDetails);
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

exports.processPayment = async (req, res) => {
  const { orderNo } = req.params;

  try {
    const result = await paymentModel.processPayment(orderNo);

    if (result) {
      res.json({ message: 'Payment processed successfully.' });
    } else {
      res.status(400).json({ message: 'Payment has already been completed.' });
    }
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Optional: Fetch all payments for a customer
exports.getPaymentsForCustomer = async (req, res) => {
  const { custId } = req.params;

  try {
    const payments = await paymentModel.getPaymentsForCustomer(custId);
    res.json(payments);
  } catch (error) {
    console.error('Error fetching payments for customer:', error);
    res.status(500).json({ message: 'Server error.' });
  }
};