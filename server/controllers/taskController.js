const Task = require("../models/Task");

// @desc    Get all tasks (Admin all, User Only Assigned Tasks)
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { status } = req.query;
    const isAdmin = req.user.role === "admin";

    let filter = {};
    if (status) {
      filter.status = status;
    }

    if (!isAdmin) {
      filter.assignedTo = req.user._id;
    }

    // Fetch filtered tasks
    let tasks = await Task.find(filter).populate(
      "assignedTo",
      "name email profilePic"
    );

    // Add completed todoChecklist count
    tasks = await Promise.all(
      tasks.map(async (task) => {
        const completedTodos = task.todoChecklist.filter(
          (todo) => todo.completed
        ).length;
        return { ...task._doc, completedTodos };
      })
    );

    // Count filtered and categorized tasks
    const statusFilter = isAdmin ? {} : { assignedTo: req.user._id };

    const allTasks = await Task.countDocuments({ ...statusFilter });
    const pendingTasks = await Task.countDocuments({
      ...statusFilter,
      status: "Pending",
    });
    const inProgressTasks = await Task.countDocuments({
      ...statusFilter,
      status: "In Progress",
    });
    const completedTasks = await Task.countDocuments({
      ...statusFilter,
      status: "Completed",
    });

    res.status(200).json({
      tasks,
      statusSummary: {
        allTasks,
        pendingTasks,
        inProgressTasks,
        completedTasks,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profilePic"
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Create a new task (Admin only)
// @route   POST /api/tasks
// @access  Private/Admin
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      attachments,
      todoChecklist,
    } = req.body;

    if (!Array.isArray(assignedTo)) {
      return res
        .status(400)
        .json({ message: "AssignedTo must be an array of user IDs" });
    }
    if (!Array.isArray(todoChecklist)) {
      return res
        .status(400)
        .json({ message: "TodoChecklist must be an array of todos" });
    }
    if (!title || !description || !dueDate) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id,
      todoChecklist,
      attachments,
    });

    await task.save();

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update a task details
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isAssigned = task.assignedTo.some(
      (userId) => userId.toString() === req.user._id.toString()
    );
    if (!isAssigned && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.priority = req.body.priority || task.priority;
    task.dueDate = req.body.dueDate || task.dueDate;
    task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
    task.attachments = req.body.attachments || task.attachments;

    if (req.body.assignedTo) {
      if (!Array.isArray(req.body.assignedTo)) {
        return res
          .status(400)
          .json({ message: "AssignedTo must be an array of user IDs" });
      }
      task.assignedTo = req.body.assignedTo;
    }
    const updatedTask = await task.save();
    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update a task status
// @route   PUT /api/tasks/:id/status
// @access  Private
const updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isAssigned = task.assignedTo.some(
      (userId) => userId.toString() === req.user._id.toString()
    );
    if (!isAssigned && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }
    task.status = req.body.status || task.status;

    if (task.status === "Completed") {
      task.todoChecklist.forEach((item) => {
        item.completed = true;
      });
      task.progress = 100;
    }
    await task.save();
    res.status(200).json({ message: "Task status updated successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete a task (Admin only)
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.deleteOne();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Update task checklist (User only)
// @route   PUT /api/tasks/:id/todo
// @access  Private
const updateTaskChecklist = async (req, res) => {
  try {
    const { todoChecklist } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (!task.assignedTo.includes(req.user._id) && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to update this task" });
    }

    task.todoChecklist = todoChecklist;

    // automatically update progress based on completed checklist items
    const completedCount = todoChecklist.filter(
      (item) => item.completed
    ).length;
    const totalItems = todoChecklist.length;
    task.progress =
      totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

    // Auto-mark task as completed if all items are checked
    if (task.progress === 100) {
      task.status = "Completed";
    } else if (task.progress > 0) {
      task.status = "In Progress";
    } else {
      task.status = "Pending";
    }

    await task.save();
    const updatedTask = await Task.findById(req.params.id).populate(
      "assignedTo",
      "name email profilePic"
    );
    res.status(200).json({
      message: "Task checklist updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get dashboard data (Admin only)
// @route   GET /api/tasks/dashboard-data
// @access  Private/Admin
const getDashboardData = async (req, res) => {
  try {
    // Fetch Statistics for the dashboard
    const totalTasks = await Task.countDocuments({});
    const pendingTasks = await Task.countDocuments({ status: "Pending" });
    const completedTasks = await Task.countDocuments({ status: "Completed" });
    const overdueTasks = await Task.countDocuments({
      status: { $ne: "Completed" },
      dueDate: { $lt: new Date() },
    });

    // Ensure all possible task statuses are included in the response
    const taskStatuses = ["Pending", "In Progress", "Completed"];
    const taskDistribution = await Task.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const taskDistributionMap = taskStatuses.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, "");
      acc[formattedKey] =
        taskDistribution.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});
    taskDistributionMap["All"] = totalTasks;

    // Ensure all possible task priorities are included in the response
    const taskPriorities = ["High", "Medium", "Low"];
    const taskPriorityLevelsRaw = await Task.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);
    const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
      acc[priority] =
        taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {});

    // Fetch recent 10 tasks
    const recentTasks = await Task.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority dueDate createdAt");

    res.status(200).json({
      statistics: {
        totalTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
      },
      chart: {
        taskDistribution: taskDistributionMap,
        taskPriorityLevels,
      },
      recentTasks,
      message: "Dashboard data fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get user dashboard data (User only)
// @route   GET /api/tasks/user-dashboard-data
// @access  Private
const getUserDashboardData = async (req, res) => {
  try {
    const userID = req.user._id; //Only fetch data for logged-in user

    // Fetch Statistics for the user-specific tasks
    const totalTasks = await Task.countDocuments({ assignedTo: userID });
    const pendingTasks = await Task.countDocuments({
      assignedTo: userID,
      status: "Pending",
    });
    const completedTasks = await Task.countDocuments({
      assignedTo: userID,
      status: "Completed",
    });
    const overdueTasks = await Task.countDocuments({
      assignedTo: userID,
      status: { $ne: "Completed" },
      dueDate: { $lt: new Date() },
    });

    // Task Distribution by Status
    const taskStatuses = ["Pending", "In Progress", "Completed"];
    const taskDistribution = await Task.aggregate([
      {
        $match: { assignedTo: userID },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);
    const taskDistributionMap = taskStatuses.reduce((acc, status) => {
      const formattedKey = status.replace(/\s+/g, "");
      acc[formattedKey] =
        taskDistribution.find((item) => item._id === status)?.count || 0;
      return acc;
    }, {});
    taskDistributionMap["All"] = totalTasks;

    // Task Distribution by Priority
    const taskPriorities = ["High", "Medium", "Low"];
    const taskPriorityLevelsRaw = await Task.aggregate([
      {
        $match: { assignedTo: userID },
      },
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);
    const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
      acc[priority] =
        taskPriorityLevelsRaw.find((item) => item._id === priority)?.count || 0;
      return acc;
    }, {});

    // Fetch recent 10 tasks for the user
    const recentTasks = await Task.find({ assignedTo: userID })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title status priority dueDate createdAt");

    res.status(200).json({
      statistics: {
        totalTasks,
        pendingTasks,
        completedTasks,
        overdueTasks,
      },
      chart: {
        taskDistribution: taskDistributionMap,
        taskPriorityLevels,
      },
      recentTasks,
      message: "User dashboard data fetched successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Export all functions
module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
  updateTaskChecklist,
  getDashboardData,
  getUserDashboardData,
};
