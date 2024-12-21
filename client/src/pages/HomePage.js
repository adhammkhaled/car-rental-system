import React, { useState, useEffect } from 'react';
import { getAvailableCars } from '../services/api';
import CarList from '../components/Car/CarList';
import './HomePage.css';


const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch cars when the component mounts or the search term changes
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAvailableCars(searchTerm);
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, [searchTerm]); // Dependency array includes searchTerm

  // Handler for search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="homepage">
      {/* Background Layer */}
      <div className="homepage-background"></div>

      {/* Foreground Content */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <CarList cars={cars} />
    </div>
  );
};

export default HomePage;
