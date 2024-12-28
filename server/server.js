// app.js
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const carRoutes = require('./routes/carRoutes');
// ... include other routes as needed

const authRoutes = require('./routes/authRoutes');

app.use('/api/cars', carRoutes);

// ... use other routes as needed
app.use('/api/auth', authRoutes);


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});