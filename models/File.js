const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  mimetype: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  url: { type: String },
});

module.exports = mongoose.model("File", fileSchema);
