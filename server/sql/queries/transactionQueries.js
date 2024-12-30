// sql/queries/transactionQueries.js
module.exports = {
    
    insertPickup: `
      INSERT INTO Pickup (order_no, pickup_date) VALUES (?, ?)
    `,
  
    
    updateReservationStatus: `
      UPDATE Reserve SET reservation_status = ? WHERE order_no = ?
    `,
  
    
    updateCarStatusAfterReturn: `
      UPDATE Car c
      JOIN Reserve r ON c.plate_id = r.plate_id
      SET c.status_id = (SELECT status_id FROM CarStatus WHERE status_name = ?)
      WHERE r.order_no = ?
    `,
  };