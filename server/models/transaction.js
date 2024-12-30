// models/transactionModel.js
const db = require('../config/database');
const queries = require('../sql/queries/transactionQueries');

exports.pickupCar = async (orderNo) => {
  
  await db.execute(queries.insertPickup, [orderNo, new Date()]);
  
  await db.execute(queries.updateReservationStatus, ['active', orderNo]);
};

exports.returnCar = async (orderNo) => {
  
  await db.execute(queries.updateReservationStatus, ['completed', orderNo]);
  
  await db.execute(queries.updateCarStatusAfterReturn, ['maintenance', orderNo]);
};