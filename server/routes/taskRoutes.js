const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const router = express.Router();

const {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
  getDashboardData,
  getUserDashboardData,
} = require("../controllers/taskController");

// Task Management Routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); // Get all tasks User: Assigned
router.get("/:id", protect, getTaskById); // Get all tasks by ID
router.post("/", protect, admin, createTask); // Create a new task
router.put("/:id", protect, updateTask); // Update a task by ID
router.delete("/:id", protect, admin, deleteTask); // Delete a task by ID
router.put("/:id/status", protect, updateTaskStatus); // update a task status
router.put("/:id/todo", protect, updateTaskChecklist); // update task checklist

module.exports = router;
