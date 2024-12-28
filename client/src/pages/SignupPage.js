// import React, { useState } from 'react';
// import { signupUser } from '../services/api';
// import { useNavigate } from 'react-router-dom';

// const SignupPage = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await signupUser(name, email, password);
//       navigate('/login'); // Redirect to login page after successful signup
//     } catch (err) {
//       setError(err.message || 'Signup failed');
//     }
//   };

//   return (
//     <div>
//       <h2>Signup</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
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
//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default SignupPage;
import React from 'react';
import SignupForm from '../components/Auth/SignupForm'; // Register component

const SignupPage = () => {
  return (
    <div>
      <div className='homepage-background'></div>
      <SignupForm /> {/* Render the Register component */}
    </div>
  );
};

export default SignupPage;

