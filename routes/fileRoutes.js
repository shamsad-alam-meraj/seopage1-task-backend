// routes/fileRoutes.js
const express = require("express");
const router = express.Router();
const {
  upload,
  uploadFile,
  getFileCountForTask,
  getFilesForTask,
} = require("../controllers/fileController");

// Route for uploading a file to a specific task
router.post("/upload/:taskId", upload.single("attachment"), uploadFile);

// Route to get attachment count for a specific task
router.get("/:taskId/count", getFileCountForTask);

// Route to get all attachments for a specific task
router.get("/:taskId/files", getFilesForTask);

module.exports = router;
