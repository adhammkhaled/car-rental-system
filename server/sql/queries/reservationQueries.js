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
  };