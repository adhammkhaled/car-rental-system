const db = require('../config/database');
const searchQueries = require('../sql/queries/searchQueries');

exports.advancedSearch = async (searchTerm) => {
  const term = `%${searchTerm}%`; // Wrap the search term with '%' for partial matching

  const params = [term,term, term, term, term, term, term, term, term, term]; // Duplicate term for each placeholder

  const [rows] = await db.execute(searchQueries.advancedSearch, params);
  return rows;
};