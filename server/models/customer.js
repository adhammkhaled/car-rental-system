// models/customerModel.js

const db = require('../config/database');

exports.getCustomerById = async (custId) => {
  const [rows] = await db.execute('SELECT * FROM Customer WHERE id = ?', [custId]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
};