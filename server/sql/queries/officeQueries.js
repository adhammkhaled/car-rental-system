// sql/queries/officeQueries.js

module.exports = {
    // Query to get all offices
    getAllOffices: `
      SELECT 
        office_id,
        office_name,
        location
      FROM Office
    `,
  };