const db = require('../config/database');
const customerQueries = require('../sql/queries/customerQueries');

exports.getUserInfo = async (custId) => {
  const [rows] = await db.execute(customerQueries.getUserInfo, [custId]);
  return rows[0];
};

exports.getReadyToPickupCars = async (custId) => {
  const [rows] = await db.execute(customerQueries.getReadyToPickupCars, [custId]);
  return rows;
};

exports.getCurrentlyRentedCars = async (custId) => {
  const [rows] = await db.execute(customerQueries.getCurrentlyRentedCars, [custId]);
  return rows;
};

exports.pickupCar = async (orderNo, custId) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(
      customerQueries.checkReservationForPickup,
      [orderNo, custId]
    );
    if (rows.length === 0) throw new Error('Reservation not eligible for pickup.');
    await connection.execute(
      customerQueries.insertPickup,
      [orderNo]
    );
    await connection.execute(
      customerQueries.updateReservationStatusToActive,
      [orderNo]
    );
    await connection.execute(
      customerQueries.updateCarStatusToRented,
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
      customerQueries.checkReservationForReturn,
      [orderNo, custId]
    );
    if (rows.length === 0) throw new Error('Reservation not eligible for return.');
    await connection.execute(
      customerQueries.insertReturn,
      [orderNo]
    );
    await connection.execute(
      customerQueries.updateReservationStatusToCompleted,
      [orderNo]
    );
    await connection.execute(
      customerQueries.updateCarStatusToMaintenance,
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