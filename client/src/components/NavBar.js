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
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Register</Link></li>
        <li><Link to="#userprofile">User Profile</Link></li>
        <li><Link to="#about">About</Link></li>
        <li><Link to="#contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
