import React from "react";
import "./CustomerPage.css";

const CustomerPage = () => {
  // Mock data for customer info (replace with actual API data)
  const userInfo = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+123 456 7890",
    address: "123 Main St, Springfield, USA",
    membership: "Gold Member",
    joined: "January 10, 2023",
  };

  // Mock data for cars rented (replace with actual API data)
  const rentedCars = [
    {
      id: 1,
      model: "Toyota Corolla",
      pickupDate: "2024-01-10",
      startDate: "2024-01-11",
      endDate: "2024-01-20",
      payment: "$200",
    },
    {
      id: 2,
      model: "Ford Mustang",
      pickupDate: "2024-02-15",
      startDate: "2024-02-16",
      endDate: "2024-02-25",
      payment: "$450",
    },
  ];

  return (
    <div className="customer-page">
      {/* Left Side: User Info */}
      <div className="left-side">
        <h2 className="section-title">Info</h2>
        <div className="customer-profile">
          <h3 className="profile-name">{userInfo.name}</h3>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Phone:</strong> {userInfo.phone}
          </p>
          <p>
            <strong>Address:</strong> {userInfo.address}
          </p>
          <p>
            <strong>Membership:</strong> {userInfo.membership}
          </p>
          <p>
            <strong>Joined:</strong> {userInfo.joined}
          </p>
        </div>
      </div>

      {/* Right Side: Rented Cars */}
      <div className="right-side">
        <h2 className="section-title">Rented Cars</h2>
        <div className="rented-cars">
          {rentedCars.map((car) => (
            <div key={car.id} className="car-item">
              <p>
                <strong>Model:</strong> {car.model}
              </p>
              <p>
                <strong>Pickup Date:</strong> {car.pickupDate}
              </p>
              <p>
                <strong>Start Date:</strong> {car.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {car.endDate}
              </p>
              <p>
                <strong>Payment:</strong> {car.payment}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
