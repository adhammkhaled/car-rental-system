// sql/queries/userQueries.js

module.exports = {
    createUser: `
      INSERT INTO users (first_name, last_name, email, password)
      VALUES (?, ?, ?, ?)
    `,
    findUserByEmail: `
      SELECT * FROM users WHERE email = ?
    `,
    // Add more queries as needed.
  };