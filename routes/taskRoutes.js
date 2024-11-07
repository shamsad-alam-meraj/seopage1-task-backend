// routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Route to get all tasks
router.get("/", getAllTasks);

// Route to get a specific task by ID
router.get("/:id", getTaskById);

// Route to create a new task
router.post("/", createTask);

// Route to update a task by ID
router.put("/:id", updateTask);

// Route to delete a task by ID
router.delete("/:id", deleteTask);

module.exports = router;
