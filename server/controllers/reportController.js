const Task = require("../models/Task");
const User = require("../models/User");
const excelJS = require("exceljs");

// @desc    Export all tasks as Excel/PDF
// @route   GET /api/reports/export/tasks
// @access  Private/Admin

const exportTasksReport = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Exporting Task", error: error.message });
  }
};

// @desc    Export users-task report as Excel/PDF
// @route   GET /api/reports/export/users
// @access  Private/Admin
const exportUsersReport = async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Exporting Task", error: error.message });
  }
};

module.exports = {
  exportTasksReport,
  exportUsersReport,
};
