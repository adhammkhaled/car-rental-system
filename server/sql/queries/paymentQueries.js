// sql/queries/paymentQueries.js

module.exports = {
    
    getPaymentDetails: `
      SELECT 
        r.order_no, 
        r.cust_id, 
        r.plate_id, 
        r.start_date, 
        r.end_date, 
        r.charge, 
        c.model, 
        c.price_per_hour, 
        c.image_url, 
        p.payment_status, 
        p.total_charge
      FROM 
        Reserve r
      JOIN 
        Car c ON r.plate_id = c.plate_id
      LEFT JOIN 
        Payment p ON r.order_no = p.order_no
      WHERE 
        r.order_no = ?
    `,
  
    
    checkExistingPayment: `
      SELECT * FROM Payment WHERE order_no = ?
    `,
  
    
    insertNewPayment: `
      INSERT INTO Payment (order_no, total_charge, payment_status)
      SELECT order_no, charge, 'completed' FROM Reserve WHERE order_no = ?
    `,
  
    
    updatePaymentStatus: `
      UPDATE Payment 
      SET payment_status = 'completed', payment_date = NOW()
      WHERE order_no = ?
    `,
  
    
    updateReservationStatus: `
      UPDATE Reserve 
      SET reservation_status = 'completed' 
      WHERE order_no = ?
    `,
  
    
    getPaymentsForCustomer: `
      SELECT 
        p.order_no,
        p.payment_date,
        p.total_charge,
        p.payment_status,
        r.start_date,
        r.end_date,
        c.model,
        c.image_url
      FROM 
        Payment p
      JOIN 
        Reserve r ON p.order_no = r.order_no
      JOIN 
        Car c ON r.plate_id = c.plate_id
      WHERE 
        r.cust_id = ?
      ORDER BY 
        p.payment_date DESC
    `,
    getDailyPayments: `
    SELECT 
      p.order_no,
      p.payment_date,
      p.total_charge,
      cu.name AS customer_name
    FROM 
      Payment p
    JOIN 
      Reserve r ON p.order_no = r.order_no
    JOIN 
      Customer cu ON r.cust_id = cu.id
    WHERE 
      p.payment_date >= ? AND p.payment_date <= ?
    ORDER BY 
      p.payment_date ASC
  `,
  };