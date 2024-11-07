// controllers/fileController.js
const File = require("../models/File");
const Task = require("../models/Task");
const multer = require("multer");
const path = require("path");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Upload file for a specific task
const uploadFile = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Get file data and create URL
    const filename = req.file.filename;
    const filePath = req.file.path;
    const fileUrl = `${req.protocol}://${req.get("host")}/${filePath}`;

    // Create and save the file record
    const newFile = new File({
      filename,
      path: filePath,
      size: req.file.size,
      mimetype: req.file.mimetype,
      taskId,
      url: fileUrl,
    });
    await newFile.save();

    res
      .status(201)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error("File upload failed", error);
    res.status(500).json({ message: "File upload failed", error });
  }
};

// Get attachment count for a specific task
const getFileCountForTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const count = await File.countDocuments({ taskId });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch file count", error });
  }
};

// Get all files for a specific task
const getFilesForTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const files = await File.find({ taskId });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch files", error });
  }
};

module.exports = { upload, uploadFile, getFileCountForTask, getFilesForTask };
