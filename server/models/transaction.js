// models/transactionModel.js
const db = require('../config/database');
const queries = require('../sql/queries/transactionQueries');

exports.pickupCar = async (orderNo) => {
  // Insert into Pickup table
  await db.execute(queries.insertPickup, [orderNo, new Date()]);
  // Update reservation status to 'active'
  await db.execute(queries.updateReservationStatus, ['active', orderNo]);
};

exports.returnCar = async (orderNo) => {
  // Update reservation status to 'completed'
  await db.execute(queries.updateReservationStatus, ['completed', orderNo]);
  // Update car status to 'maintenance'
  await db.execute(queries.updateCarStatusAfterReturn, ['maintenance', orderNo]);
};