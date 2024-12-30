// app.js
const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json());
app.use(cors());


const carRoutes = require('./routes/carRoutes');


const authRoutes = require('./routes/authRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');

const userRoutes = require('./routes/userRoutes');

const transactionRoutes = require('./routes/transactionRoutes');

const customerRoutes = require('./routes/customerRoutes');


app.use('/api/customer', customerRoutes);

app.use('/api', transactionRoutes);

app.use('/api', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/cars', carRoutes);



app.use('/api/admin', adminRoutes);
app.use('/api/reserve', reservationRoutes);

app.use('/api/auth', authRoutes);



const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});