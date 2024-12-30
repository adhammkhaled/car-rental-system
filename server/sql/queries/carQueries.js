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

    getCarDetails: `
      SELECT 
            plate_id,
            model,
            year,
            colour,
            price_per_hour,
            num_seats,
            speed,
            fuel_cons,
            image_url
        FROM 
            Car
        WHERE 
            plate_id = ? AND status_id = 1;
    `,

   
   getAllCarStatuses: `
   SELECT 
     status_id,
     status_name
   FROM CarStatus
 `,

 
 getAllCars: `
   SELECT 
     plate_id,
     model,
     year,
     colour,
     price_per_hour,
     num_seats,
     speed,
     fuel_cons,
     image_url,
     status_id,
     office_id
   FROM Car
 `,

 
 createCar: `
   INSERT INTO Car (
     plate_id, model, year, colour, price_per_hour, num_seats, speed, fuel_cons, image_url, office_id, status_id
   ) VALUES (
     ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
   )
 `,

 
 updateCar: `
   UPDATE Car
   SET
     model = ?,
     year = ?,
     colour = ?,
     price_per_hour = ?,
     num_seats = ?,
     speed = ?,
     fuel_cons = ?,
     image_url = ?,
     office_id = ?,
     status_id = ?
   WHERE plate_id = ?
 `,
 getCarStatusByDay: `
    SELECT
      c.plate_id,
      c.model,
      cs.status_name
    FROM
      Car c
    JOIN
      (SELECT plate_id, status_id, MAX(status_change_date) as last_change
       FROM CarStatusHistory
       WHERE status_change_date <= ?
       GROUP BY plate_id
      ) as csh ON c.plate_id = csh.plate_id
    JOIN
      CarStatus cs ON csh.status_id = cs.status_id;
  `,
  
  };