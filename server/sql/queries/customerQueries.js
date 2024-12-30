module.exports = {
    getUserInfo: `
      SELECT name FROM Customer WHERE id = ?
    `,
  
    getReadyToPickupCars: `
      SELECT r.order_no, c.model, c.plate_id
      FROM Reserve r
      JOIN Car c ON r.plate_id = c.plate_id
      LEFT JOIN Pickup p ON r.order_no = p.order_no
      WHERE r.cust_id = ? AND r.reservation_status = 'completed' AND p.order_no IS NULL
    `,
  
    getCurrentlyRentedCars: `
      SELECT r.order_no, c.model, c.plate_id
      FROM Reserve r
      JOIN Car c ON r.plate_id = c.plate_id
      JOIN Pickup p ON r.order_no = p.order_no
      LEFT JOIN \`Return\` ret ON r.order_no = ret.order_no
      WHERE r.cust_id = ? AND r.reservation_status = 'active' AND ret.order_no IS NULL
    `,
  
    checkReservationForPickup: `
      SELECT * FROM Reserve WHERE order_no = ? AND cust_id = ? AND reservation_status = "completed"
    `,
  
    insertPickup: `
      INSERT INTO Pickup (order_no, pickup_date) VALUES (?, NOW())
    `,
  
    updateReservationStatusToActive: `
      UPDATE Reserve SET reservation_status = "active" WHERE order_no = ?
    `,
  
    updateCarStatusToRented: `
      UPDATE Car SET status_id = (SELECT status_id FROM CarStatus WHERE status_name = "rented")
      WHERE plate_id = (SELECT plate_id FROM Reserve WHERE order_no = ?)
    `,
  
    checkReservationForReturn: `
      SELECT * FROM Reserve WHERE order_no = ? AND cust_id = ? AND reservation_status = "active"
    `,
  
    insertReturn: `
      INSERT INTO \`Return\` (order_no, return_date) VALUES (?, NOW())
    `,
  
    updateReservationStatusToCompleted: `
      UPDATE Reserve SET reservation_status = "completed" WHERE order_no = ?
    `,
  
    updateCarStatusToMaintenance: `
      UPDATE Car SET status_id = (SELECT status_id FROM CarStatus WHERE status_name = "maintenance")
      WHERE plate_id = (SELECT plate_id FROM Reserve WHERE order_no = ?)
    `,
  };