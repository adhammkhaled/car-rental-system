// // controllers/authController.js
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const userModel = require('../models/userModel');

// exports.registerUser = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;

//     // Check if user already exists
//     const existingUser = await userModel.findUserByEmail(email);
//     if (existingUser) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create the user
//     const userId = await userModel.createUser(
//       firstName,
//       lastName,
//       email,
//       hashedPassword
//     );

//     // Generate JWT
//     const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.status(201).json({ token, user: { id: userId, firstName, lastName, email } });

//   } catch (error) {
//     console.error('Error registering user:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Find user by email
//     const user = await userModel.findUserByEmail(email);
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Generate JWT
//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });

//     res.status(200).json({ token, user: { id: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email } });

//   } catch (error) {
//     console.error('Error logging in user:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Add more functions as needed.

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/user'); // Assumes a User model exists for DB interaction

// Registration
exports.register = async (req, res) => {
  try {
    const {name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user in the database
    const userId = await userModel.createUser(name, email, hashedPassword);

    res.status(201).json({ message: 'User registered successfully', userId });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find the user
    const user = role === "customer"
    ? await userModel.findUserByEmail(email)
    : await userModel.findAdminByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }
    //console.log(role,user.role);
    // Compare passwords (will be changed (use bcrypt for admins as well))
    const isMatch = role === "customer" ? await bcrypt.compare(password, user.password) : password === user.password;
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password.' });
    }
    // Generate a JWT
    const token = jwt.sign({ id: user.id, email: user.email ,role: user.role}, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token valid for 1 hour
    });

    res.status(200).json({ message: 'Login successful', token,
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
