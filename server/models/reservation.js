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


exports.advancedSearch = async (searchCriteria) => {
  // Extract search parameters with default empty strings
  const {
    car_model = '',
    car_year = '',
    car_colour = '',
    office_location = '',
    car_status = '',
    customer_email = '',
    customer_id = '',
    reservation_date = ''
  } = searchCriteria;

  // Prepare parameters for the SQL query
  const params = [
    `%${car_model}%`,
    `%${car_year}%`,
    `%${car_colour}%`,
    `%${office_location}%`,
    `%${car_status}%`,
    `%${customer_email}%`,
    `%${customer_id}%`,
    reservation_date 
  ];

  const [rows] = await db.execute(queries.advancedSearch, params);
  return rows;
};

exports.getReservationsByPeriod = async (params) => {
  const { start_date, end_date } = params;
  const [rows] = await db.execute(queries.getReservationsByPeriod, [
    start_date,
    end_date,
  ]);
  return rows;
};

exports.getReservationsByCar = async (params) => {
  const { plate_id, start_date, end_date } = params;
  const [rows] = await db.execute(queries.getReservationsByCar, [
    plate_id,
    start_date,
    end_date,
  ]);
  return rows;
};

exports.getReservationsByCustomer = async (params) => {
  const { customer_id } = params;
  const [rows] = await db.execute(queries.getReservationsByCustomer, [
    customer_id,
  ]);
  return rows;
};
exports.getReservedCars = async (userId) => {
  const [rows] = await db.execute(queries.getReservedCars, [userId]);
  return rows;
};

exports.getRentedCars = async (userId) => {
  const [rows] = await db.execute(queries.getRentedCars, [userId]);
  return rows;
};

exports.updateReservationStatus = async (orderNo, status) => {
  await db.execute(queries.updateReservationStatus, [status, orderNo]);
};

exports.insertPickup = async (orderNo) => {
  await db.execute(queries.insertPickup, [orderNo]);
};

exports.updateCarStatus = async (plateId, statusId) => {
  await db.execute(queries.updateCarStatus, [statusId, plateId]);
};

exports.getCarPlateId = async (orderNo) => {
  const [rows] = await db.execute(queries.getCarPlateId, [orderNo]);
  return rows[0]?.plate_id || null;
};

exports.completeReservation = async (orderNo) => {
  await db.execute(queries.completeReservation, [orderNo]);
};

exports.getCarStatusIdByName = async (statusName) => {
  const [rows] = await db.execute(queries.getCarStatusIdByName, [statusName]);
  return rows[0]?.status_id || null;
};