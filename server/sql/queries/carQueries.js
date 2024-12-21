// sql/queries/carQueries.js

module.exports = {
    insertCar: `
      INSERT INTO cars (model, year, plate_id, status)
      VALUES (?, ?, ?, ?)
    `,
    updateCarStatus: `
      UPDATE cars SET status = ? WHERE id = ?
    `,
    getAvailableCars: `
      SELECT 
            c.plate_id,
            c.model,
            c.year,
            c.colour,
            c.price_per_hour,
            c.num_seats,
            c.speed,
            c.fuel_cons,
            c.image_url
        FROM 
            Car c
        JOIN 
            CarStatus cs ON c.status_id = cs.status_id
        WHERE 
            cs.status_name = 'active' 
            AND (c.model LIKE ? OR c.year LIKE ? OR c.plate_id LIKE ? OR c.colour LIKE ?);
    `

  ,
    // Other queries...
  };