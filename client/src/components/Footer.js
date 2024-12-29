import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Car Rental System</h3>
          <p>Your trusted partner for reliable and affordable car rentals.</p>
        </div>

        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p><i className="fas fa-phone"></i> +1 234 567 890</p>
          <p><i className="fas fa-envelope"></i> support@carrentalpro.com</p>
          <p><i className="fas fa-map-marker-alt"></i> 123 Car Street, Cityville</p>
        </div>

        
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} CarRentalSystem. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
