import React from 'react';
import { useParams } from 'react-router-dom';
import './PaymentSuccessPage.css';

function PaymentSuccessPage() {
  const { orderNo } = useParams();

  return (
    <div className="success-container">
      <h1>Payment Successful!</h1>
      <p>Your payment for Order No: {orderNo} has been completed successfully.</p>
      {/* Add more details or navigation options as needed */}
    </div>
  );
}

export default PaymentSuccessPage;