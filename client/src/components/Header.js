import React from "react";
import Navbar from "./NavBar.js";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-brand">Car Rental System</div>
      <Navbar />
    </header>
  );
};

export default Header;
