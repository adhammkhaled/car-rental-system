// models/userModel.js
const db = require('../config/db');
const userQueries = require('../sql/queries/userQueries');

exports.createUser = async (firstName, lastName, email, passwordHash) => {
  const [result] = await db.execute(userQueries.createUser, [
    firstName,
    lastName,
    email,
    passwordHash,
  ]);
  return result.insertId;
};

exports.findUserByEmail = async (email) => {
  const [rows] = await db.execute(userQueries.findUserByEmail, [email]);
  return rows[0];
};

// Add more functions as needed.