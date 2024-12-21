// services/api.js
import axios from 'axios';


// Function to get available cars with optional search term
export const getAvailableCars = async (searchTerm = '') => {
  try {
    const response = await axios.get(`api/cars/available`, {
      params: { search: searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching available cars:', error);
    throw error;
  }
};

// Add more API functions as needed