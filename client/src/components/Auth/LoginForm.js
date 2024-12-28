// import React, { useState } from 'react';
// import './LoginForm.css'; // Import external CSS file

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5000/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage('Login successful!');
//         localStorage.setItem('token', data.token); // Save the token in localStorage
//       } else {
//         setMessage(data.message || 'Login failed.');
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setMessage('Server error. Please try again later.');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

import React, { useState } from 'react';
import Button from '../Common/Button';
import './FormStyles.css'; // Import generic form styles

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState('customer'); // Default role is customer

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password,role }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        localStorage.setItem('isLoggedIn', 'true'); // Store login status
        localStorage.setItem('token', data.token);
      } else {
        setMessage(data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Server error. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleLogin}>
        <h2 className="form-title">Login</h2>
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
        <div className="form-group">
          <label>Role:</label>
          <div>
            <label>
              <input
                type="radio"
                name="role"
                value="customer"
                checked={role === 'customer'}
                onChange={() => setRole('customer')}
              />
              Customer
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
              />
              Admin
            </label>
          </div>
          
        </div>
        {message && <p className="form-message">{message}</p>}
        <Button type="submit" variant="primary" size="medium" fullWidth>
          Login
        </Button>
      </form>

    </div>
  );
};

export default LoginForm;
