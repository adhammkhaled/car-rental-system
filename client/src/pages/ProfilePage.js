import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPage from "./AdminPage";
import CustomerPage from "./CustomerPage";

const UserPage = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // Add state to hold the role
  const [loading, setLoading] = useState(true); // Loading state to show until the redirect happens

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedRole = localStorage.getItem("role");
    console.log(storedRole);

    if (!isLoggedIn) {
      // Redirect to login if the user is not logged in
      navigate("/login");
    } else {
      setRole(storedRole); // Set the role
    }
    setLoading(false); // Set loading to false once checks are done
  }, [navigate]);

  // While loading, you can show a loading message or spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the appropriate page based on role
  if (role === "admin") {
    return <AdminPage />;
  } else if (role === "customer") {
    return <CustomerPage />;
  } else {
    // Redirect to login if the role is not recognized
    navigate("/login");
    return null; // Avoid rendering any content here
  }
};

export default UserPage;
