// models/userModel.js
const db = require('../config/database');
const userQueries = require('../sql/queries/userQueries');

exports.createUser = async (Name, email, passwordHash) => {
  const [result] = await db.execute(userQueries.createUser, [
    Name,
    email,
    passwordHash,
  ]);
  return result.insertId;
};

exports.findUserByEmail = async (email) => {
  const [rows] = await db.execute(userQueries.findUserByEmail, [email]);
  return rows[0];
};
exports.findAdminByEmail = async (email) => {
  const [rows] = await db.execute(userQueries.findAdminByEmail, [email]);
  return rows[0];
};
exports.getUserById = async (userId) => {
  const [rows] = await db.execute(userQueries.getUserById, [userId]);
  return rows[0];
};
exports.getCustomerById = async (customerId) => {
  const [rows] = await db.execute(customerQueries.getCustomerById, [customerId]);
  return rows[0];
};

exports.getCustomerName = async (customerId) => {
  const [rows] = await db.execute(customerQueries.getCustomerName, [customerId]);
  return rows[0]?.name;
};

// Reservation related operations
exports.getCustomerInfo = async (id) => {
  const [rows] = await db.execute(queries.getCustomerInfo, [id]);
  return rows[0];
};

exports.getReadyToPickupCars = async (id) => {
  const [rows] = await db.execute(queries.getReadyToPickupCars, [id]);
  return rows;
};

exports.getRentedCars = async (id) => {
  const [rows] = await db.execute(queries.getRentedCars, [id]);
  return rows;
};
// Add more functions as needed.

