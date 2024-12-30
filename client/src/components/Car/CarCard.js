import React from 'react';
import './CarCard.css'; 
import Button from '../Common/Button'

const CarCard = ({ car }) => {
  const { plate_id, model, year, colour,price_per_hour,num_seats,speed, fuel_cons ,image_url} = car;

  return (
    <div className='card-container'>
      <div className="car-card">
      <div className="car-card-details">
        <h2>{model}</h2>
        <p>Year: {year}</p>
        <p>Plate ID: {plate_id}</p>
        <p>Price per hour: {price_per_hour}</p>
      </div>
      <div className="car-card-image">
        <img src={image_url} alt={model} />
      </div>
      <Button 
        onClick={() => window.location.href = `/cars/${plate_id}`}
        variant="primary"
        size="medium"
      >
        View Details
      </Button>
    </div>
  </div>

  );
};

export default CarCard;

