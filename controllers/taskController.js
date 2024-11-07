// controllers/taskController.js
const Task = require("../models/Task");

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.aggregate([
      {
        $lookup: {
          from: "files",
          localField: "_id",
          foreignField: "taskId",
          as: "attachments",
        },
      },
      {
        $addFields: {
          attachmentsCount: { $size: "$attachments" },
        },
      },
      {
        $project: {
          attachments: {
            $map: {
              input: "$attachments",
              as: "attachment",
              in: "$$attachment.url",
            },
          },
          title: 1,
          clientName: 1,
          assignedTo: 1,
          description: 1,
          status: 1,
          commentsCount: 1,
          attachmentsCount: 1,
          dueDate: 1,
          priority: 1,
          createdAt: 1,
        },
      },
    ]);

    res.status(200).json({
      status: 200,
      message: "Task List Fetched Successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error });
  }
};

// Get a specific task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task", error });
  }
};

// Create a new task
const createTask = async (req, res) => {
  try {
    const {
      title,
      clientName,
      assignedTo,
      description,
      status,
      attachments,
      commentsCount,
      attachmentsCount,
      dueDate,
      priority,
    } = req.body;

    const newTask = new Task({
      title,
      clientName,
      assignedTo,
      description,
      status,
      attachments,
      commentsCount,
      attachmentsCount,
      dueDate,
      priority,
    });

    await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully", task: newTask });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error });
  }
};

// Update an existing task by ID
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      clientName,
      assignedTo,
      description,
      status,
      attachments,
      commentsCount,
      attachmentsCount,
      dueDate,
      priority,
    } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        clientName,
        assignedTo,
        description,
        status,
        attachments,
        commentsCount,
        attachmentsCount,
        dueDate,
        priority,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
