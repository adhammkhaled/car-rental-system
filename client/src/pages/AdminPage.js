import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPage.css';
import {
  createCar,
  updateCar,
  getAllCars,
  getAllCarStatuses,
  getAllOffices,
  advancedSearch,
  generateReport,
} from '../services/api';

const AdminPage = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role');

  const [cars, setCars] = useState([]);
  const [carStatuses, setCarStatuses] = useState([]);
  const [offices, setOffices] = useState([]);
  const [newCar, setNewCar] = useState({
    plate_id: '',
    model: '',
    year: '',
    colour: '',
    price_per_hour: '',
    num_seats: '',
    speed: '',
    fuel_cons: '',
    image_url: '',
    status_id: '',
    office_id: '',
  });
  const [selectedCar, setSelectedCar] = useState(null);
  const [updateCarData, setUpdateCarData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [reportType, setReportType] = useState('');
  const [reportParams, setReportParams] = useState({});
  const [reportResults, setReportResults] = useState([]);

  useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/not-authorized');
    } else {
      fetchAllData();
    }
  }, [userRole, navigate]);

  const fetchAllData = async () => {
    try {
      const [carsData, statusesData, officesData] = await Promise.all([
        getAllCars(),
        getAllCarStatuses(),
        getAllOffices(),
      ]);
      setCars(carsData);
      setCarStatuses(statusesData);
      setOffices(officesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  const handleNewCarChange = (e) => {
    setNewCar({ ...newCar, [e.target.name]: e.target.value });
  };

  const handleCreateCar = async (e) => {
    e.preventDefault();
    try {
      await createCar(newCar);
      setNewCar({
        plate_id: '',
        model: '',
        year: '',
        colour: '',
        price_per_hour: '',
        num_seats: '',
        speed: '',
        fuel_cons: '',
        image_url: '',
        status_id: '',
        office_id: '',
      });
      fetchAllData(); 
      alert('Car created successfully!');
    } catch (error) {
      console.error('Error creating car:', error);
      setErrorMessage('Failed to create car. Please try again.');
    }
  };

  
  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setUpdateCarData(car);
  };

  const handleUpdateCarChange = (e) => {
    setUpdateCarData({ ...updateCarData, [e.target.name]: e.target.value });
  };

  const handleUpdateCar = async (e) => {
    e.preventDefault();
    try {
      await updateCar(selectedCar.plate_id, updateCarData);
      setSelectedCar(null);
      setUpdateCarData({});
      fetchAllData(); // Refresh data
      alert('Car updated successfully!');
    } catch (error) {
      console.error('Error updating car:', error);
      setErrorMessage('Failed to update car. Please try again.');
    }
  };

  
  const handleSearchChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const handleAdvancedSearch = async () => {
    try {
      const results = await advancedSearch(searchCriteria);
      setSearchResults(results);
    } catch (error) {
      console.error('Error performing advanced search:', error);
      setErrorMessage('Failed to perform search. Please try again.');
    }
  };

  
  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
    setReportParams({}); // Reset parameters when report type changes
    setReportResults([]); // Clear previous results
  };

  const handleReportParamChange = (e) => {
    setReportParams({ ...reportParams, [e.target.name]: e.target.value });
  };

  const handleGenerateReport = async () => {
    try {
      const results = await generateReport(reportType, reportParams);
      setReportResults(results);
    } catch (error) {
      console.error('Error generating report:', error);
      setErrorMessage('Failed to generate report. Please try again.');
    }
  };

  
  const formatHeader = (header) => {
    return header.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>
      <main className="admin-content">
        <h2>Welcome, Admin!</h2>
        <p>Here you can manage your application settings and cars.</p>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Add New Car Section */}
        <div className="admin-actions">
          <h3>Add New Car</h3>
          <form className="car-form" onSubmit={handleCreateCar}>
            <input
              type="text"
              name="plate_id"
              placeholder="Plate ID"
              value={newCar.plate_id}
              onChange={handleNewCarChange}
              required
            />
            <input
              type="text"
              name="model"
              placeholder="Model"
              value={newCar.model}
              onChange={handleNewCarChange}
              required
            />
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={newCar.year}
              onChange={handleNewCarChange}
              required
            />
            <input
              type="text"
              name="colour"
              placeholder="Colour"
              value={newCar.colour}
              onChange={handleNewCarChange}
            />
            <input
              type="number"
              name="price_per_hour"
              placeholder="Price per Hour"
              value={newCar.price_per_hour}
              onChange={handleNewCarChange}
              required
            />
            <input
              type="number"
              name="num_seats"
              placeholder="Number of Seats"
              value={newCar.num_seats}
              onChange={handleNewCarChange}
            />
            <input
              type="number"
              name="speed"
              placeholder="Speed"
              value={newCar.speed}
              onChange={handleNewCarChange}
            />
            <input
              type="number"
              name="fuel_cons"
              placeholder="Fuel Consumption"
              value={newCar.fuel_cons}
              onChange={handleNewCarChange}
            />
            <input
              type="text"
              name="image_url"
              placeholder="Image URL"
              value={newCar.image_url}
              onChange={handleNewCarChange}
            />

            {/* Dropdown for Car Status */}
            <select
              name="status_id"
              value={newCar.status_id}
              onChange={handleNewCarChange}
              required
            >
              <option value="">Select Status</option>
              {carStatuses.map((status) => (
                <option key={status.status_id} value={status.status_id}>
                  {status.status_name}
                </option>
              ))}
            </select>

            {/* Dropdown for Office */}
            <select
              name="office_id"
              value={newCar.office_id}
              onChange={handleNewCarChange}
              required
            >
              <option value="">Select Office</option>
              {offices.map((office) => (
                <option key={office.office_id} value={office.office_id}>
                  {office.office_name}
                </option>
              ))}
            </select>

            <button type="submit" className="action-btn">
              Create Car
            </button>
          </form>
        </div>

        {/* Update Existing Car Section */}
        <div className="admin-actions">
          <h3>Update Existing Car</h3>
          <div className="car-list">
            {cars.map((car) => (
              <div key={car.plate_id} className="car-item">
                <p>
                  {car.model} ({car.plate_id})
                </p>
                <button onClick={() => handleCarSelect(car)} className="action-btn">
                  Edit
                </button>
              </div>
            ))}
          </div>

          {selectedCar && (
            <form className="car-form" onSubmit={handleUpdateCar}>
              <h4>
                Editing: {selectedCar.model} ({selectedCar.plate_id})
              </h4>
              <input
                type="text"
                name="model"
                placeholder="Model"
                value={updateCarData.model}
                onChange={handleUpdateCarChange}
                required
              />
              <input
                type="number"
                name="year"
                placeholder="Year"
                value={updateCarData.year}
                onChange={handleUpdateCarChange}
                required
              />
              <input
                type="text"
                name="colour"
                placeholder="Colour"
                value={updateCarData.colour}
                onChange={handleUpdateCarChange}
              />
              <input
                type="number"
                name="price_per_hour"
                placeholder="Price per Hour"
                value={updateCarData.price_per_hour}
                onChange={handleUpdateCarChange}
                required
              />
              <input
                type="number"
                name="num_seats"
                placeholder="Number of Seats"
                value={updateCarData.num_seats}
                onChange={handleUpdateCarChange}
              />
              <input
                type="number"
                name="speed"
                placeholder="Speed"
                value={updateCarData.speed}
                onChange={handleUpdateCarChange}
              />
              <input
                type="number"
                name="fuel_cons"
                placeholder="Fuel Consumption"
                value={updateCarData.fuel_cons}
                onChange={handleUpdateCarChange}
              />
              <input
                type="text"
                name="image_url"
                placeholder="Image URL"
                value={updateCarData.image_url}
                onChange={handleUpdateCarChange}
              />

              {/* Dropdown for Car Status */}
              <select
                name="status_id"
                value={updateCarData.status_id}
                onChange={handleUpdateCarChange}
                required
              >
                <option value="">Select Status</option>
                {carStatuses.map((status) => (
                  <option key={status.status_id} value={status.status_id}>
                    {status.status_name}
                  </option>
                ))}
              </select>

              {/* Dropdown for Office */}
              <select
                name="office_id"
                value={updateCarData.office_id}
                onChange={handleUpdateCarChange}
                required
              >
                <option value="">Select Office</option>
                {offices.map((office) => (
                  <option key={office.office_id} value={office.office_id}>
                    {office.office_name}
                  </option>
                ))}
              </select>

              <button type="submit" className="action-btn">
                Update Car
              </button>
              <button
                type="button"
                className="action-btn cancel-btn"
                onClick={() => setSelectedCar(null)}
              >
                Cancel
              </button>
            </form>
          )}
        </div>

        {/* Advanced Search Section */}
        <div className="admin-actions">
          <h3>Advanced Search</h3>
          <input
            type="text"
            placeholder="Search by car info, customer info, or reservation date"
            value={searchCriteria}
            onChange={handleSearchChange}
          />
          <button onClick={handleAdvancedSearch} className="action-btn">
            Search
          </button>
          {searchResults.length > 0 && (
            <div className="search-results">
              <h4>Search Results</h4>
              <table>
                <thead>
                  <tr>
                    <th>Order No</th>
                    <th>Car Model</th>
                    <th>Plate ID</th>
                    <th>Customer Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((result, index) => (
                    <tr key={index}>
                      <td>{result.order_no}</td>
                      <td>{result.car_model}</td>
                      <td>{result.plate_id}</td>
                      <td>{result.customer_name}</td>
                      <td>{result.start_date}</td>
                      <td>{result.end_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Reports Section */}
        <div className="admin-actions">
          <h3>Generate Reports</h3>
          <select value={reportType} onChange={handleReportTypeChange}>
            <option value="">Select Report Type</option>
            <option value="reservations_by_period">Reservations by Period</option>
            <option value="reservations_by_car">Reservations by Car</option>
            <option value="car_status_by_day">Car Status by Day</option>
            <option value="reservations_by_customer">Reservations by Customer</option>
            <option value="daily_payments">Daily Payments</option>
          </select>

          {/* Render report parameter inputs based on selected report type */}
          {reportType === 'reservations_by_period' && (
            <>
              <input
                type="date"
                name="start_date"
                placeholder="Start Date"
                onChange={handleReportParamChange}
              />
              <input
                type="date"
                name="end_date"
                placeholder="End Date"
                onChange={handleReportParamChange}
              />
            </>
          )}

          {reportType === 'reservations_by_car' && (
            <>
              <input
                type="text"
                name="plate_id"
                placeholder="Plate ID"
                onChange={handleReportParamChange}
              />
              <input
                type="date"
                name="start_date"
                placeholder="Start Date"
                onChange={handleReportParamChange}
              />
              <input
                type="date"
                name="end_date"
                placeholder="End Date"
                onChange={handleReportParamChange}
              />
            </>
          )}

          {reportType === 'car_status_by_day' && (
            <>
              <input
                type="date"
                name="specific_date"
                placeholder="Date"
                onChange={handleReportParamChange}
              />
            </>
          )}

          {reportType === 'reservations_by_customer' && (
            <>
              <input
                type="text"
                name="customer_id"
                placeholder="Customer ID"
                onChange={handleReportParamChange}
              />
            </>
          )}

          {reportType === 'daily_payments' && (
            <>
              <input
                type="date"
                name="start_date"
                placeholder="Start Date"
                onChange={handleReportParamChange}
              />
              <input
                type="date"
                name="end_date"
                placeholder="End Date"
                onChange={handleReportParamChange}
              />
            </>
          )}

          {reportType && (
            <button onClick={handleGenerateReport} className="action-btn">
              Generate Report
            </button>
          )}

          {reportResults.length > 0 && (
            <div className="report-results">
              <h4>Report Results</h4>
              <table>
                <thead>
                  <tr>
                    {Object.keys(reportResults[0]).map((key, index) => (
                      <th key={index}>{formatHeader(key)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {reportResults.map((result, index) => (
                    <tr key={index}>
                      {Object.values(result).map((value, idx) => (
                        <td key={idx}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;