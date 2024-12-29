// ... other imports
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CheckoutPage.css';
import { getPaymentDetails, processPayment } from '../services/api';
import Button from '../components/Common/Button';

function CheckoutPage() {
  const { orderNo } = useParams();
  const navigate = useNavigate();

  const [paymentDetails, setPaymentDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);

  useEffect(() => {
    // Fetch payment details when the component mounts
    const fetchPaymentDetails = async () => {
      try {
        const data = await getPaymentDetails(orderNo);
        setPaymentDetails(data);
      } catch (error) {
        console.error('Error fetching payment details:', error);
        setErrorMessage('Failed to load payment details.');
      }
    };

    fetchPaymentDetails();
  }, [orderNo]);

  const handlePayment = async () => {
    setProcessingPayment(true);
    try {
      await processPayment(orderNo);
      // Redirect to a success page or display a success message
      navigate(`/payment-success/${orderNo}`);
    } catch (error) {
      console.error('Error processing payment:', error);
      setErrorMessage('Failed to process payment.');
    } finally {
      setProcessingPayment(false);
    }
  };

  if (errorMessage) {
    return (
      <div className="checkout-container">
        <p className="error-message">{errorMessage}</p>
      </div>
    );
  }

  if (!paymentDetails) {
    return (
      <div className="checkout-container">
        <p>Loading...</p>
      </div>
    );
  }

  const { reservation, car, payment } = paymentDetails;

  return (
    <div className="checkout-container">
      <h1>Checkout - Order No: {orderNo}</h1>
      <div className="reservation-details">
        <h2>Reservation Details</h2>
        <p><strong>Car Model:</strong> {car.model}</p>
        <p><strong>Plate ID:</strong> {car.plate_id}</p>
        <p><strong>Start Date:</strong> {reservation.start_date}</p>
        <p><strong>End Date:</strong> {reservation.end_date}</p>
        <p><strong>Price per Day:</strong> ${parseFloat(car.price_per_hour).toFixed(2)}</p>
        <p><strong>Total Charge:</strong> ${parseFloat(reservation.charge).toFixed(2)}</p>
      </div>

      <div className="payment-section">
        <h2>Payment Information</h2>
        <p><strong>Payment Status:</strong> {payment.payment_status}</p>
        <p><strong>Total Amount:</strong> ${parseFloat(payment.total_charge).toFixed(2)}</p>
        {/* You can add more payment details or options here */}
      </div>

      {payment.payment_status !== 'completed' && (
        <Button
          onClick={handlePayment}
          variant="success"
          size="large"
          disabled={processingPayment}
          style={{ marginTop: '20px' }}
        >
          {processingPayment ? 'Processing...' : 'Confirm and Pay'}
        </Button>
      )}

      {payment.payment_status === 'completed' && (
        <p className="success-message">Payment completed successfully!</p>
      )}
    </div>
  );
}

export default CheckoutPage;