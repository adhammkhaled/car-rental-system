const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");
const authMiddleware = require("../middlewares/authMiddleware");

// Protect routes with authentication if necessary
router.get(
  "/reservations",
  authMiddleware.verifyToken,
  reportController.getReservationsReport
);
router.get(
  "/daily-payments",
  authMiddleware.verifyToken,
  reportController.getDailyPaymentsReport
);

module.exports = router;
