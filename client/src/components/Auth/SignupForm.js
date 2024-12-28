import React, { useState } from 'react';
import Button from '../Common/Button';
import './FormStyles.css'; // Reuse the same CSS file

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const nameRegex = /^[A-Za-z]+$/; // Only alphabets for name
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Valid email pattern
  const passwordRegex = /.{8,}/; // Password must be at least 8 characters long

  const handleRegister = async (e) => {
    e.preventDefault();
    // Validate fields
    if (!nameRegex.test(name)) {
      setMessage('Name should only contain alphabets');
      return;
    }
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email');
      return;
    }

    if (!passwordRegex.test(password)) {
      setMessage('Password must be at least 8 characters long');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful!');
      } else {
        setMessage(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleRegister}>
        <h2 className="form-title">Sign Up</h2>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {message && <p className="form-message">{message}</p>}
        <Button type="submit" variant="primary" size="medium" fullWidth>
          Register
        </Button>
      </form>
    </div>
  );
};

export default SignupForm;
