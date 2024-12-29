// models/reservationModel.js

const db = require('../config/database'); 
const queries = require('../sql/queries/reservationQueries');

exports.insertReservation = async (custId, plateId, startDate, endDate) => {
  const [result] = await db.execute(queries.insertReservation, [
    custId,
    plateId,
    startDate,
    endDate,
  ]);
  return result.insertId; // Return the generated order_no
};

exports.checkCarAvailability = async (plateId, startDate, endDate) => {
  const [rows] = await db.execute(queries.checkCarAvailability, [
    plateId,
    startDate,
    endDate,
    startDate,
    endDate,
    startDate,
    endDate,
  ]);
  return rows.length === 0; // Returns true if the car is available
};

exports.getReservationDetails = async (orderNo) => {
  const [rows] = await db.execute(queries.getReservationDetails, [orderNo]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};

exports.cancelReservation = async (orderNo, custId) => {
  const [result] = await db.execute(queries.cancelReservation, [orderNo, custId]);
  return result.affectedRows > 0; // Returns true if a row was updated
};