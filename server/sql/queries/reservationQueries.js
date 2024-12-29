// sql/queries/reservationQueries.js

module.exports = {
    insertReservation: `
      INSERT INTO Reserve (cust_id, plate_id, start_date, end_date)
      VALUES (?, ?, ?, ?)
    `,
  
    checkCarAvailability: `
      SELECT 1 FROM Reserve
      WHERE plate_id = ?
        AND reservation_status IN ('pending', 'active')
        AND (
              (? BETWEEN start_date AND end_date)
           OR (? BETWEEN start_date AND end_date)
           OR (start_date BETWEEN ? AND ?)
           OR (end_date BETWEEN ? AND ?)
        )
    `,
  
    getReservationDetails: `
      SELECT 
        r.order_no,
        r.cust_id,
        r.plate_id,
        r.start_date,
        r.end_date,
        r.charge,
        r.reservation_status,
        c.model,
        c.year,
        c.colour,
        c.price_per_hour,
        c.num_seats,
        c.image_url
      FROM 
        Reserve r
      JOIN 
        Car c ON r.plate_id = c.plate_id
      WHERE 
        r.order_no = ?
    `,
  
    cancelReservation: `
      UPDATE Reserve
      SET reservation_status = 'cancelled'
      WHERE order_no = ? AND cust_id = ?
    `,
    advancedSearch: `
    SELECT
      r.order_no,
      r.start_date,
      r.end_date,
      c.plate_id,
      c.model AS car_model,
      c.year AS car_year,
      c.colour AS car_colour,
      c.price_per_hour,
      c.num_seats,
      c.speed,
      c.fuel_cons,
      c.image_url,
      cs.status_name AS car_status,
      o.office_name,
      o.location AS office_location,
      cu.id AS customer_id,
      cu.name AS customer_name,
      cu.email AS customer_email,
      cu.created_at AS customer_since
    FROM
      Reserve r
    RIGHT JOIN
      Car c ON r.plate_id = c.plate_id
    LEFT JOIN
      CarStatus cs ON c.status_id = cs.status_id
    LEFT JOIN
      Office o ON c.office_id = o.office_id
    LEFT JOIN
      Customer cu ON r.cust_id = cu.id
    WHERE
       (
      c.model LIKE ?
      OR c.year LIKE ?
      OR c.colour LIKE ?
      OR o.location LIKE ?
      OR cs.status_name LIKE ?
      OR cu.email LIKE ?
      OR cu.id LIKE ?
      OR r.start_date = ?)
  `,

  getReservationsByPeriod: `
    SELECT r.order_no, r.start_date, r.end_date, c.model AS car_model, c.plate_id, cu.name AS customer_name
    FROM Reserve r
    JOIN Car c ON r.plate_id = c.plate_id
    JOIN Customer cu ON r.cust_id = cu.id
    WHERE
      r.start_date >= ? AND r.end_date <= ?
  `,

  getReservationsByCar: `
    SELECT r.order_no, r.start_date, r.end_date, c.model AS car_model, c.plate_id
    FROM Reserve r
    JOIN Car c ON r.plate_id = c.plate_id
    WHERE
      c.plate_id = ? AND r.start_date >= ? AND r.end_date <= ?
  `,

  getReservationsByCustomer: `
    SELECT r.order_no, r.start_date, r.end_date, c.model AS car_model, c.plate_id, cu.name AS customer_name
    FROM Reserve r
    JOIN Car c ON r.plate_id = c.plate_id
    JOIN Customer cu ON r.cust_id = cu.id
    WHERE
      r.cust_id = ?
  `,
  };