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


// Function to handle user login
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('/api/auth/login', { email, password });
    return response.data; // Contains token and user data
  } catch (error) {
    console.error('Error logging in:', error);
    throw error.response.data; // Return error message to UI
  }
};

// Function to handle user signup
export const signupUser = async (name, email, password) => {
  try {
    const response = await axios.post('/api/auth/signup', { name, email, password });
    return response.data; // Contains success message
  } catch (error) {
    console.error('Error signing up:', error);
    throw error.response.data; // Return error message to UI
  }
};
