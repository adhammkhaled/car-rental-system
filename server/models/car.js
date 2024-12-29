
const db = require('../config/database');
const carQueries = require('../sql/queries/carQueries');

exports.getAvailableCars = async (searchTerm = '') => {
  const searchValue = `%${searchTerm}%`;
  const [rows] = await db.execute(carQueries.getAvailableCars, [searchValue, searchValue, searchValue, searchValue]);
  return rows;
};

exports.getCarDetails = async (plateId) => {
  const [rows] = await db.execute(carQueries.getCarDetails, [plateId]);
  return rows[0]; // Return the first matching car (if any)
};

// Add more model functions as needed