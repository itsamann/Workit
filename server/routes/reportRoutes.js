const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const {
  exportTasksReport,
  exportUsersReport,
} = require("../controllers/reportController");

const router = express.Router();

router.get("/export/tasks", protect, admin, exportTasksReport); // Export tasks as Excel/PDF
router.get("/export/users", protect, admin, exportUsersReport); // Export users-task report

module.exports = router;
