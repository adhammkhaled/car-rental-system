const db = require("../db"); // Assuming you have a db connection module
const reportQueries = require("../queries/reportQueries");

module.exports = {
  getReservationsReport: async (startDate, endDate) => {
    const [results] = await db.query(reportQueries.getReservationsReport, [
      startDate,
      endDate,
    ]);
    return results;
  },

  getDailyPaymentsReport: async (date) => {
    const [results] = await db.query(reportQueries.getDailyPaymentsReport, [
      date,
    ]);
    return results;
  },
};
