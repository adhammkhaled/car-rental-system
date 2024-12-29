// models/officeModel.js

const db = require('../config/database');
const officeQueries = require('../sql/queries/officeQueries');

exports.getAllOffices = async () => {
  const [rows] = await db.execute(officeQueries.getAllOffices);
  return rows;
};