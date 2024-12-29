// models/carStatusModel.js

const db = require('../config/database');
const carQueries = require('../sql/queries/carQueries');

exports.getAllCarStatuses = async () => {
  const [rows] = await db.execute(carQueries.getAllCarStatuses);
  return rows;
};