// import React from "react";
// import "./NavBar.css";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <ul className="navbar-menu">
//         <li><a href="#home">Home</a></li>
//         <li><a href="#login">Login</a></li>
//         <li><a href="#register">Registser</a></li>
//         <li><a href="#userprofile">User Profile</a></li>
//         <li><a href="#about">About</a></li>
//         <li><a href="#contact">Contact</a></li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;

// Navbar.js
import { useEffect } from 'react';
import React ,{ useState }from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  useEffect(() => {
    // Whenever the component is mounted, check login status
    setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    setIsLoggedIn(false);  // Update the state to reflect the logout
  };
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        {!isLoggedIn ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Register</Link></li>
          </>
        ) : (
          <>
            {/* Show Logout and User Profile if logged in */}
            <li><Link to="/profile">User Profile</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
        <li><Link to="#about">About</Link></li>
        <li><Link to="#contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
