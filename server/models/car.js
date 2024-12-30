
const db = require('../config/database');
const carQueries = require('../sql/queries/carQueries');

exports.getAvailableCars = async (searchTerm = '') => {
  const searchValue = `%${searchTerm}%`;
  const [rows] = await db.execute(carQueries.getAvailableCars, [searchValue, searchValue, searchValue, searchValue]);
  return rows;
};

exports.getCarDetails = async (plateId) => {
  const [rows] = await db.execute(carQueries.getCarDetails, [plateId]);
  return rows[0]; 
};

exports.getAllCars = async () => {
  const [rows] = await db.execute(carQueries.getAllCars);
  return rows;
};

exports.createCar = async (carData) => {
  const {
    plate_id,
    model,
    year,
    colour,
    price_per_hour,
    num_seats,
    speed,
    fuel_cons,
    image_url,
    status_id,
    office_id,
  } = carData;

  await db.execute(carQueries.createCar, [
    plate_id,
    model,
    year,
    colour,
    price_per_hour,
    num_seats,
    speed,
    fuel_cons,
    image_url,
    office_id,
    status_id,
  ]);
};

exports.updateCar = async (plate_id, carData) => {
  const {
    model,
    year,
    colour,
    price_per_hour,
    num_seats,
    speed,
    fuel_cons,
    image_url,
    status_id,
    office_id,
  } = carData;

  await db.execute(carQueries.updateCar, [
    model,
    year,
    colour,
    price_per_hour,
    num_seats,
    speed,
    fuel_cons,
    image_url,
    office_id,
    status_id,
    plate_id,
  ]);
};
exports.getCarStatusByDay = async (params) => {
  const { specific_date } = params;
  const [rows] = await db.execute(carQueries.getCarStatusByDay, [
    specific_date,
  ]);
  return rows;
};
// Add more model functions as needed