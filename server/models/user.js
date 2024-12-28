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

// Add more functions as needed.

