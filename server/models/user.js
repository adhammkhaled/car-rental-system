const db = require("../config/database"); // Assuming database configuration
const customerQueries = require("../sql/queries/userQueries"); // Queries for customer-related operations

// Fetch customer data by email (excluding password)
exports.findUserByEmail = async (email) => {
  const [rows] = await db.execute(customerQueries.findUserByEmail, [email]);
  return rows[0]; // Assuming there's only one customer with a unique email
};

// Add more model functions as needed
