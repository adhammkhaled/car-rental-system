const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");


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
