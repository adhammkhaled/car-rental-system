import React from "react";
import "./CustomerPage.css";

const CustomerProfile = ({ user }) => {
  // Mock data for now (replace it with actual API data or props)
  const mockUser = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+123 456 7890",
    address: "123 Main St, Springfield, USA",
    membership: "Gold Member",
    joined: "January 10, 2023",
  };

  const userInfo = user || mockUser;

  return (
    <div className="customer-profile">
      {/* Profile Header */}
      <div className="profile-header">
        {/* <img
          src="https://via.placeholder.com/150" // Placeholder image; replace with actual image
          alt={`${userInfo.name}'s avatar`}
          className="profile-avatar"
        /> */}
        <h2 className="profile-name">{userInfo.name}</h2>
        <p className="profile-membership">{userInfo.membership}</p>
      </div>

      {/* Profile Details */}
      <div className="profile-details">
        <div className="detail-item">
          <span className="detail-label">Email:</span>
          <span className="detail-value">{userInfo.email}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Phone:</span>
          <span className="detail-value">{userInfo.phone}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Address:</span>
          <span className="detail-value">{userInfo.address}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Joined:</span>
          <span className="detail-value">{userInfo.joined}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
