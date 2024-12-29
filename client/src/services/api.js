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

// Function to get car details
export const getCarDetails = (plate_id) => {
  return axios.get(`/api/cars/${plate_id}`);
};

export const reservePlate = async (plate_id, reservation) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/reserve/${plate_id}`, reservation);
    if(response.ok){
      console.log('Reservation successful:', response.data);
      return response.data; // Return the response data for further use
    }
    else{
      console.log('Reservation failed:', response.data);
      return response.data; // Return the response data for further use
    }
    // console.log('Reservation successful:', response.data);
    // return response.data; // Return the response data for further use
  } catch (error) {
    console.error(
      'Error making reservation:',
      error.response?.data || error.message
    );
    
    return { success: false, error: error.response?.data || error.message }; // Return the error for further handling
  }
};

// Function to get payment details
export const getPaymentDetails = async (orderNo) => {
  try {
    const response = await axios.get(`/api/payments/${orderNo}`);
    return response.data; // Contains reservation, car, and payment data
  } catch (error) {
    console.error('Error fetching payment details:', error);
    throw error.response?.data || error.message;
  }
};

// Function to process payment
export const processPayment = async (orderNo) => {
  try {
    const response = await axios.put(`/api/payments/${orderNo}`);
    return response.data; // Contains success message
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error.response?.data || error.message;
  }
};


