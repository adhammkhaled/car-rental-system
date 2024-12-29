// src/components/ReservationPage.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ReservationPage.css';
import { reservePlate } from '../services/api';
import Button from '../components/Common/Button';

function ReservationPage() {
  const { plate_id } = useParams();
  const navigate = useNavigate();
  
  const custId = localStorage.getItem('id'); // Get customer ID from local storage

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [orderNo, setOrderNo] = useState(null); // State to store order number

  const handleReservation = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!startDate || !endDate) {
      setErrorMessage('Please select both start and end dates.');
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setErrorMessage('End date must be after start date.');
      return;
    }

    // Create reservation object
    const reservation = {
      cust_id: custId,
      plate_id: plate_id,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      // Send POST request to backend API
      const data = await reservePlate(plate_id, reservation);

      if (data.order_no) {
        setSuccessMessage(`Reservation successful! Your order number is ${data.order_no}.`);
        setOrderNo(data.order_no);
      } else {
        setErrorMessage(data.message || 'Failed to reserve the car.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while processing your reservation.');
    }
  };

  return (
    <div className="reservation-container">
      <h1>Reserve Car - Plate ID: {plate_id}</h1>
      <form onSubmit={handleReservation}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <div className="form-group">
          <label htmlFor="start_date">Start Date:</label>
          <input
            type="date"
            id="start_date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="end_date">End Date:</label>
          <input
            type="date"
            id="end_date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        {/* Replace the submit button with custom Button */}
        <Button type="submit" variant="primary" size="large">
          Reserve Now
        </Button>
      </form>

      {/* Conditionally render the Payout button */}
      {orderNo && (
        <Button 
          onClick={() => navigate(`/checkout/${orderNo}`)}
          variant="success"
          size="large"
          style={{ marginTop: '20px' }} // Add some spacing
        >
          Proceed to Checkout
        </Button>
      )}
    </div>
  );
}

export default ReservationPage;