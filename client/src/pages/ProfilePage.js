import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPage from "./AdminPage";
import CustomerPage from "./CustomerPage";

const UserPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedRole = localStorage.getItem("role");
    console.log(storedRole);

    if (!isLoggedIn) {
      // Redirect to login if the user is not logged in
      navigate("/login");
    } else {
      setRole(storedRole); 
    }
    setLoading(false); 
  }, [navigate]);

  
  if (loading) {
    return <div>Loading...</div>;
  }

  
  if (role === "admin") {
    return <AdminPage />;
  } else if (role === "customer") {
    return <CustomerPage />;
  } else {
    // Redirect to login if the role is not recognized
    navigate("/login");
    return null; 
  }
};

export default UserPage;
