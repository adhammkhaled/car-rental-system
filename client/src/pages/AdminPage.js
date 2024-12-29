import React from "react";
import "./AdminPage.css";

const AdminPage = () => {
  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>
      <nav className="admin-sidebar">
        <ul>
          <li>Manage Users</li>
          <li>View Reports</li>
          <li>Settings</li>
        </ul>
      </nav>
      <main className="admin-content">
        <h2>Welcome, Admin!</h2>
        <p>Here you can manage your application settings and users.</p>
        <div className="admin-actions">
          <button className="action-btn">Add Car</button>
          <button className="action-btn">Generate Report</button>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
