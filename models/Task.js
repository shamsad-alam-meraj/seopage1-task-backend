const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  clientName: { type: String, required: true },
  assignedTo: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: [
      "Incomplete",
      "To Do",
      "Doing",
      "Under Review",
      "Completed",
      "Over Due",
    ],
    default: "To Do",
  },
  attachments: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
  commentsCount: { type: Number, default: 0 },
  attachmentsCount: { type: Number, default: 0 },
  dueDate: { type: Date },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);
