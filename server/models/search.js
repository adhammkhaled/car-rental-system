const db = require('../config/database');
const searchQueries = require('../sql/queries/searchQueries');

exports.advancedSearch = async (searchTerm) => {
  const term = `%${searchTerm}%`; 

  const params = [term,term, term, term, term, term, term, term, term, term];

  const [rows] = await db.execute(searchQueries.advancedSearch, params);
  return rows;
};