const db = require('../config/database');

exports.getUserInfo = async (custId) => {
  const [rows] = await db.execute('SELECT name FROM Customer WHERE id = ?', [custId]);
  return rows[0];
};

exports.getReadyToPickupCars = async (custId) => {
  const query = `
    SELECT r.order_no, c.model, c.plate_id
    FROM Reserve r
    JOIN Car c ON r.plate_id = c.plate_id
    LEFT JOIN Pickup p ON r.order_no = p.order_no
    WHERE r.cust_id = ? AND r.reservation_status = 'pending' AND p.order_no IS NULL
  `;
  const [rows] = await db.execute(query, [custId]);
  return rows;
};

exports.getCurrentlyRentedCars = async (custId) => {
  const query = `
    SELECT r.order_no, c.model, c.plate_id
    FROM Reserve r
    JOIN Car c ON r.plate_id = c.plate_id
    JOIN Pickup p ON r.order_no = p.order_no
    LEFT JOIN \`Return\` ret ON r.order_no = ret.order_no
    WHERE r.cust_id = ? AND r.reservation_status = 'active' AND ret.order_no IS NULL
  `;
  const [rows] = await db.execute(query, [custId]);
  return rows;
};

exports.pickupCar = async (orderNo, custId) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(
      'SELECT * FROM Reserve WHERE order_no = ? AND cust_id = ? AND reservation_status = "pending"',
      [orderNo, custId]
    );
    if (rows.length === 0) throw new Error('Reservation not eligible for pickup.');
    await connection.execute(
      'INSERT INTO Pickup (order_no, pickup_date) VALUES (?, NOW())',
      [orderNo]
    );
    await connection.execute(
      'UPDATE Reserve SET reservation_status = "active" WHERE order_no = ?',
      [orderNo]
    );
    await connection.execute(
      'UPDATE Car SET status_id = (SELECT status_id FROM CarStatus WHERE status_name = "rented") WHERE plate_id = (SELECT plate_id FROM Reserve WHERE order_no = ?)',
      [orderNo]
    );
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

exports.returnCar = async (orderNo, custId) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(
      'SELECT * FROM Reserve WHERE order_no = ? AND cust_id = ? AND reservation_status = "active"',
      [orderNo, custId]
    );
    if (rows.length === 0) throw new Error('Reservation not eligible for return.');
    await connection.execute(
      'INSERT INTO \`Return\` (order_no, return_date) VALUES (?, NOW())',
      [orderNo]
    );
    await connection.execute(
      'UPDATE Reserve SET reservation_status = "completed" WHERE order_no = ?',
      [orderNo]
    );
    await connection.execute(
      'UPDATE Car SET status_id = (SELECT status_id FROM CarStatus WHERE status_name = "maintenance") WHERE plate_id = (SELECT plate_id FROM Reserve WHERE order_no = ?)',
      [orderNo]
    );
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};