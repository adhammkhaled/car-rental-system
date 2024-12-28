// sql/queries/userQueries.js

module.exports = {
    createUser: `
      INSERT INTO Customer (Name, email, password)
      VALUES (?, ?, ?)
    `,
    findUserByEmail: `
      SELECT * FROM Customer WHERE email = ?
    `,
    // Add more queries as needed.
  };