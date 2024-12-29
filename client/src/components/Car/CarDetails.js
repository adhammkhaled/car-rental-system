// CarDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCarDetails } from '../../services/api'; // Your API service
import './CarDetails.css'; // Component-specific CSS

const CarDetails = () => {
  const { plate_id } = useParams();  // Extract plate_id from the URL params
  const [carDetails, setCarDetails] = useState(null);
  const [error, setError] = useState(null);
    console.log(plate_id);
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await getCarDetails(plate_id);  // Fetch car details from the API
        setCarDetails(response.data);
      } catch (err) {
        setError(err.response ? err.response.data : 'Something went wrong');
      }
    };
    
    fetchCarDetails();
  }, [plate_id]);  // Fetch data whenever plate_id changes

  if (error) {
    return (
      <div className="error-message">
        <h2>Error fetching car details</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!carDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="car-details-container">
      <h1>{carDetails.model} ({carDetails.year})</h1>
      <div className="car-details">
        <img src={carDetails.image_url} alt={carDetails.model} className="car-details-image" />
        <div className="car-info">
          <p><strong>Plate ID:</strong> {carDetails.plate_id}</p>
          <p><strong>Colour:</strong> {carDetails.colour}</p>
          <p><strong>Price per hour:</strong> ${carDetails.price_per_hour}</p>
          <p><strong>Number of seats:</strong> {carDetails.num_seats}</p>
          <p><strong>Speed:</strong> {carDetails.speed} km/h</p>
          <p><strong>Fuel Consumption:</strong> {carDetails.fuel_cons} L/100km</p>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
