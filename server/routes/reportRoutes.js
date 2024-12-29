const express = require("express");
const router = express.Router();
const customerController = require("../controllers/reportController");
const authMiddleware = require("../middlewares/authMiddleware");

// Protect the routes with authentication middleware if needed
router.get(
  "/data",
  authMiddleware.verifyToken,
  customerController.getCustomerData
); // get customer data by email

module.exports = router;
