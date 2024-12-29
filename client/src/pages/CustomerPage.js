import React, { useState, useEffect } from 'react';
import './CustomerPage.css';
import { getUserInfo, getReadyToPickupCars, getCurrentlyRentedCars, pickupCar, returnCar } from '../services/api';

const CustomerPage = () => {
  const [userName, setUserName] = useState('');
  const [readyToPickupCars, setReadyToPickupCars] = useState([]);
  const [rentedCars, setRentedCars] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchUserInfo();
    fetchReadyToPickupCars();
    fetchCurrentlyRentedCars();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const data = await getUserInfo();
      setUserName(data.name);
    } catch (error) {
      setErrorMessage('Error fetching user info.');
    }
  };

  const fetchReadyToPickupCars = async () => {
    try {
      const data = await getReadyToPickupCars();
      setReadyToPickupCars(data);
    } catch (error) {
      setErrorMessage('Error fetching ready-to-pickup cars.');
    }
  };

  const fetchCurrentlyRentedCars = async () => {
    try {
      const data = await getCurrentlyRentedCars();
      setRentedCars(data);
    } catch (error) {
      setErrorMessage('Error fetching rented cars.');
    }
  };

  const handlePickup = async (orderNo) => {
    try {
      await pickupCar(orderNo);
      fetchReadyToPickupCars();
      fetchCurrentlyRentedCars();
      alert('Car picked up successfully.');
    } catch (error) {
      alert('Error picking up car.');
    }
  };

  const handleReturn = async (orderNo) => {
    try {
      await returnCar(orderNo);
      fetchCurrentlyRentedCars();
      alert('Car returned successfully.');
    } catch (error) {
      alert('Error returning car.');
    }
  };

  return (
    <div className="customer-container">
      <h1>Welcome, {userName}</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="section">
        <h2>Ready to Pickup</h2>
        {readyToPickupCars.length === 0 ? (
          <p>No cars ready to pickup.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order No</th>
                <th>Car Model</th>
                <th>Plate ID</th>
                <th>Pickup</th>
              </tr>
            </thead>
            <tbody>
              {readyToPickupCars.map((car) => (
                <tr key={car.order_no}>
                  <td>{car.order_no}</td>
                  <td>{car.model}</td>
                  <td>{car.plate_id}</td>
                  <td>
                    <button onClick={() => handlePickup(car.order_no)} className="action-btn">
                      Pick Up
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="section">
        <h2>Currently Rented Cars</h2>
        {rentedCars.length === 0 ? (
          <p>No cars currently rented.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Order No</th>
                <th>Car Model</th>
                <th>Plate ID</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              {rentedCars.map((car) => (
                <tr key={car.order_no}>
                  <td>{car.order_no}</td>
                  <td>{car.model}</td>
                  <td>{car.plate_id}</td>
                  <td>
                    <button onClick={() => handleReturn(car.order_no)} className="action-btn">
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CustomerPage;