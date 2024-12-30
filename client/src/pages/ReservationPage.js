import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ReservationPage.css";
import { reservePlate } from "../services/api";
import Button from "../components/Common/Button";

function ReservationPage() {
  const { plate_id } = useParams();
  const navigate = useNavigate();

  const [isAuthorized, setIsAuthorized] = useState(true); 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderNo, setOrderNo] = useState(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; 
    const userRole = localStorage.getItem("role"); 

    if (!isLoggedIn || userRole !== "customer") {
      setErrorMessage(
        "Access denied. Only logged-in customers can make reservations."
      );
      setIsAuthorized(false);

      
      setTimeout(() => navigate(isLoggedIn ? "/" : "/login"), 3000);
    }
  }, [navigate]);

  const handleReservation = async (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      setErrorMessage("Please select both start and end dates.");
      return;
    }
    if (new Date(endDate) < new Date(startDate)) {
      setErrorMessage("End date must be after start date.");
      return;
    }

    const custId = localStorage.getItem("id"); 
    const reservation = {
      cust_id: custId,
      plate_id: plate_id,
      start_date: startDate,
      end_date: endDate,
    };

    try {
      const data = await reservePlate(plate_id, reservation);

      if (data.order_no) {
        setSuccessMessage(
          `Reservation successful! Your order number is ${data.order_no}.`
        );
        setOrderNo(data.order_no);
      } else {
        setErrorMessage(data.message || "Failed to reserve the car.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while processing your reservation.");
    }
  };

  
  if (!isAuthorized) return null;

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

        <Button type="submit" variant="primary" size="large">
          Reserve Now
        </Button>
      </form>

      {orderNo && (
        <Button
          onClick={() => navigate(`/checkout/${orderNo}`)}
          variant="success"
          size="large"
          style={{ marginTop: "20px" }}
        >
          Proceed to Checkout
        </Button>
      )}
    </div>
  );
}

export default ReservationPage;
