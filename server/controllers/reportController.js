const reportModel = require("../models/report");

exports.getReservationsReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const reservations = await reportModel.getReservationsReport(
      startDate,
      endDate
    );

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations report:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDailyPaymentsReport = async (req, res) => {
  try {
    const { date } = req.query;

    const payments = await reportModel.getDailyPaymentsReport(date);

    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching daily payments report:", error);
    res.status(500).json({ message: "Server error" });
  }
};
