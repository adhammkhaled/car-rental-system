// services/api.js
import axios from 'axios';

// Base URL configuration (optional)
const API_BASE_URL = 'http://localhost:5000'; // Replace with your API base URL if needed
axios.defaults.baseURL = API_BASE_URL;
const custId = localStorage.getItem('id');
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

// Function to get all cars (for admin purposes)
export const getAllCars = async () => {
  try {
    const response = await axios.get('/api/admin/cars');
    return response.data;
  } catch (error) {
    console.error('Error fetching all cars:', error);
    throw error.response?.data || error.message;
  }
};

// Function to create a new car
export const createCar = async (carData) => {
  try {
    const response = await axios.post('/api/admin/cars', carData);
    return response.data;
  } catch (error) {
    console.error('Error creating car:', error);
    throw error.response?.data || error.message;
  }
};

// Function to update an existing car
export const updateCar = async (plate_id, carData) => {
  try {
    const response = await axios.put(`/api/admin/cars/${plate_id}`, carData);
    return response.data;
  } catch (error) {
    console.error('Error updating car:', error);
    throw error.response?.data || error.message;
  }
};

// Function to get all car statuses
export const getAllCarStatuses = async () => {
  try {
    const response = await axios.get('/api/admin/car-statuses');
    return response.data;
  } catch (error) {
    console.error('Error fetching car statuses:', error);
    throw error.response?.data || error.message;
  }
};

// Function to get all offices
export const getAllOffices = async () => {
  try {
    const response = await axios.get('/api/admin/offices');
    return response.data;
  } catch (error) {
    console.error('Error fetching offices:', error);
    throw error.response?.data || error.message;
  }
};

export const advancedSearch = async (searchTerm) => {
  try {
    const response = await axios.get(`/api/admin/advanced-search`, {
      params: { searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error('Error performing advanced search:', error);
    throw error.response?.data || error.message;
  }
};

// Function to generate reports
export const generateReport = async (reportType, params) => {
  try {
    const response = await axios.get(`/api/admin/reports/${reportType}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating report:', error);
    throw error.response?.data || error.message;
  }
};


export const getUserInfo = async () => {
  const response = await axios.get(`/api/customer/info/${custId}`);
  return response.data;
};

export const getReadyToPickupCars = async () => {
  const response = await axios.get(`/api/customer/ready-to-pickup/${custId}`);
  return response.data;
};

export const getCurrentlyRentedCars = async () => {
  const response = await axios.get(`/api/customer/currently-rented/${custId}`);
  return response.data;
};

export const pickupCar = async (orderNo) => {
  await axios.post(`/api/customer/pickup/${orderNo}/${custId}`);
};

export const returnCar = async (orderNo) => {
  await axios.post(`/api/customer/return/${orderNo}/${custId}`);
};

