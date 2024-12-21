import React from "react";
import "./NavBar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#login">Login</a></li>
        <li><a href="#register">Registser</a></li>
        <li><a href="#userprofile">User Profile</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
