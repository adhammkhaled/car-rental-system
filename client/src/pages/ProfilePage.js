import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status and role from localStorage
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const role = localStorage.getItem("role");

    if (!isLoggedIn) {
      // Redirect to login if the user is not logged in
      navigate("/login");
    } else if (role === "admin") {
      // Redirect to AdminPage if the role is admin
      navigate("/admin");
    } else if (role === "customer") {
      // Redirect to CustomerPage if the role is customer
      navigate("/customer");
    } else {
      // Redirect to login if the role is not recognized
      navigate("/login");
    }
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default UserPage;
