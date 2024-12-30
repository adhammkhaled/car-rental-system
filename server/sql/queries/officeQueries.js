// sql/queries/officeQueries.js

module.exports = {
    
    getAllOffices: `
      SELECT 
        office_id,
        office_name,
        location
      FROM Office
    `,
  };