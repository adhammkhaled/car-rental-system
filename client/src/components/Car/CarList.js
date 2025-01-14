// components/Car/CarList.js
import React from 'react';
import CarCard from './CarCard';

//import './CarList.css'; // Create a CSS file for styling if needed

const CarList = ({ cars }) => {
  if (cars.length === 0) {
    return <p>No cars available.</p>;
  }

  return (
    <div className="car-list">
      {cars.map((car) => (
        <CarCard key={car.plate_id} car={car} />  
      ))}
    </div>
  );
};

export default CarList;
