// sql/queries/transactionQueries.js
module.exports = {
    // Insert into Pickup table
    insertPickup: `
      INSERT INTO Pickup (order_no, pickup_date) VALUES (?, ?)
    `,
  
    // Update reservation status
    updateReservationStatus: `
      UPDATE Reserve SET reservation_status = ? WHERE order_no = ?
    `,
  
    // Update car status after return
    updateCarStatusAfterReturn: `
      UPDATE Car c
      JOIN Reserve r ON c.plate_id = r.plate_id
      SET c.status_id = (SELECT status_id FROM CarStatus WHERE status_name = ?)
      WHERE r.order_no = ?
    `,
  };