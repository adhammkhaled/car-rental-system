// sql/queries/userQueries.js

module.exports = {
    createUser: `
      INSERT INTO Customer (Name, email, password)
      VALUES (?, ?, ?)
    `,
    findUserByEmail: `
      SELECT * FROM Customer WHERE email = ?
    `,
    findAdminByEmail: `
      SELECT * FROM Admin WHERE email = ?
    `,
    getUserById: `
    SELECT 
      *
    FROM Customer
    WHERE id = ?
  `,
  getReadyPickups: `
  SELECT 
      R.order_no,
      C.model,
      C.plate_id,
      R.start_date,
      R.end_date,
      R.charge,
      P.payment_status
  FROM Reserve R
  JOIN Car C ON R.plate_id = C.plate_id
  JOIN Payment P ON R.order_no = P.order_no
  WHERE R.cust_id = ? 
  AND P.payment_status = 'completed'
  AND R.reservation_status = 'pending'
`,

getRentedCars: `
  SELECT 
      R.order_no,
      C.model,
      C.plate_id,
      PU.pickup_date,
      R.end_date
  FROM Reserve R
  JOIN Car C ON R.plate_id = C.plate_id
  JOIN Pickup PU ON R.order_no = PU.order_no
  WHERE R.cust_id = ? 
  AND R.reservation_status = 'active'
`,

createPickup: `
  INSERT INTO Pickup (order_no, pickup_date)
  VALUES (?, NOW())
`,

updateReservationStatusActive: `
  UPDATE Reserve 
  SET reservation_status = 'active',
      updated_at = NOW()
  WHERE order_no = ?
`,

updateReservationStatusCompleted: `
  UPDATE Reserve 
  SET reservation_status = 'completed',
      updated_at = NOW()
  WHERE order_no = ?
`,

getPlateIdFromOrder: `
  SELECT plate_id 
  FROM Reserve 
  WHERE order_no = ?
`,

updateCarStatusMaintenance: `
  UPDATE Car 
  SET status_id = (
      SELECT status_id 
      FROM CarStatus 
      WHERE status_name = 'maintenance'
  ),
  updated_at = NOW()
  WHERE plate_id = ?
`,
getCustomerInfo: `
    SELECT id, name, email FROM Customer WHERE id = ?
  `,

  // Get orders that are paid but not picked up
  getReadyToPickupCars: `
    SELECT
      r.order_no,
      c.plate_id,
      c.model,
      r.start_date,
      r.end_date
    FROM
      Reserve r
      JOIN Car c ON r.plate_id = c.plate_id
      JOIN Payment p ON r.order_no = p.order_no
    WHERE
      r.cust_id = ?
      AND p.payment_status = 'completed'
      AND r.reservation_status = 'pending'
      AND NOT EXISTS (
        SELECT 1 FROM Pickup pk WHERE pk.order_no = r.order_no
      )
  `,

  // Get cars currently rented by the customer
  getRentedCars: `
    SELECT
      r.order_no,
      c.plate_id,
      c.model,
      r.start_date,
      r.end_date
    FROM
      Reserve r
      JOIN Car c ON r.plate_id = c.plate_id
      JOIN Pickup pk ON r.order_no = pk.order_no
    WHERE
      r.cust_id = ?
      AND r.reservation_status = 'active'
  `,
    // Add more queries as needed.
  };