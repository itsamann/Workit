const express = require("express");
const { protect, admin } = require("../middlewares/authMiddleware");
const {
  getUsers,
  getUserById,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// User Routes
router.get("/", protect, admin, getUsers);
router.get("/:id", protect, getUserById);
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
