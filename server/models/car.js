
const db = require('../config/database');
const carQueries = require('../sql/queries/carQueries');

exports.getAvailableCars = async (searchTerm = '') => {
  const searchValue = `%${searchTerm}%`;
  const [rows] = await db.execute(carQueries.getAvailableCars, [searchValue, searchValue, searchValue, searchValue]);
  return rows;
};


// Add more model functions as needed