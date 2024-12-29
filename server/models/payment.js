// models/paymentModel.js

const db = require('../config/database'); // Import your database connection
const paymentQueries = require('../sql/queries/paymentQueries'); // Import payment queries

exports.getPaymentDetails = async (orderNo) => {
  // Use the query from paymentQueries.js
  const query = paymentQueries.getPaymentDetails;

  const [rows] = await db.execute(query, [orderNo]);

  if (rows.length === 0) {
    return null;
  }

  const reservation = {
    order_no: rows[0].order_no,
    cust_id: rows[0].cust_id,
    plate_id: rows[0].plate_id,
    start_date: rows[0].start_date,
    end_date: rows[0].end_date,
    charge: rows[0].charge,
  };

  const car = {
    plate_id: rows[0].plate_id,
    model: rows[0].model,
    price_per_hour: rows[0].price_per_hour,
    image_url: rows[0].image_url,
  };

  const payment = {
    payment_status: rows[0].payment_status || 'pending',
    total_charge: rows[0].total_charge || reservation.charge,
  };

  return { reservation, car, payment };
};

exports.processPayment = async (orderNo) => {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Use the query from paymentQueries.js
    const checkPaymentQuery = paymentQueries.checkExistingPayment;

    // Check if payment already exists
    const [paymentRows] = await connection.execute(
      checkPaymentQuery,
      [orderNo]
    );

    if (
      paymentRows.length > 0 &&
      paymentRows[0].payment_status === 'completed'
    ) {
      // Payment already completed
      await connection.rollback();
      return false;
    }

    if (paymentRows.length === 0) {
      // Insert new payment record
      const insertPaymentQuery = paymentQueries.insertNewPayment;
      await connection.execute(insertPaymentQuery, [orderNo]);
    } else {
      // Update existing payment record
      const updatePaymentStatusQuery = paymentQueries.updatePaymentStatus;
      await connection.execute(updatePaymentStatusQuery, [orderNo]);
    }

    // Update reservation status to 'completed'
    const updateReservationStatusQuery = paymentQueries.updateReservationStatus;
    await connection.execute(updateReservationStatusQuery, [orderNo]);

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    console.error('Error during payment processing transaction:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// Optional: Get all payments for a customer
exports.getPaymentsForCustomer = async (custId) => {
  const query = paymentQueries.getPaymentsForCustomer;
  const [rows] = await db.execute(query, [custId]);
  return rows;
};
exports.getDailyPayments = async (params) => {
    const { start_date, end_date } = params;
    const [rows] = await db.execute(require('../sql/queries/paymentQueries').getDailyPayments, [
      start_date,
      end_date,
    ]);
    return rows;
  };