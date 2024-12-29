import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import CarPage from "./pages/CarPage";
import ReservationPage from "./pages/ReservationPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cars/:plate_id" element={<CarPage />} />
        <Route path="/reserve/:plate_id" element={<ReservationPage />} />
        <Route path="/checkout/:orderNo" element={<CheckoutPage />} />
        <Route
          path="/payment-success/:orderNo"
          element={<PaymentSuccessPage />}
        />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
