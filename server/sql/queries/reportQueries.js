module.exports = {
  getReservationsReport: `
      SELECT 
          r.order_no,
          c.name AS customer_name,
          cr.model AS car_model,
          r.start_date,
          r.end_date,
          r.charge,
          r.reservation_status
      FROM 
          Reserve r
      JOIN 
          Customer c ON r.cust_id = c.id
      JOIN 
          Car cr ON r.plate_id = cr.plate_id
      WHERE 
          r.start_date >= ? AND r.end_date <= ?;
    `,

  getDailyPaymentsReport: `
      SELECT 
          p.order_no,
          c.name AS customer_name,
          cr.model AS car_model,
          p.payment_date,
          p.additional_charge,
          p.payment_status
      FROM 
          Payment p
      JOIN 
          Reserve r ON p.order_no = r.order_no
      JOIN 
          Customer c ON r.cust_id = c.id
      JOIN 
          Car cr ON r.plate_id = cr.plate_id
      WHERE 
          p.payment_date = ?;
    `,
};
