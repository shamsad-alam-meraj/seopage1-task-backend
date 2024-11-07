// seedTasks.js

const mongoose = require("mongoose");
const Task = require("./models/Task"); // Adjust the path as necessary

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (error) => {
  console.error("Database connection error:", error);
});

mongoose.connection.once("open", () => {
  console.log("Database connected");
  seedTasks();
});

const statuses = [
  "Incomplete",
  "To Do",
  "Doing",
  "Under Review",
  "Completed",
  "Over Due",
];

const createTasks = (status) => {
  const tasks = [];
  for (let i = 1; i <= 10; i++) {
    tasks.push({
      title: `${status} Task ${i}`,
      clientName: `Client Name ${i}`,
      assignedTo: `User ${i}`,
      description: `This is a description for ${status} Task ${i}.`,
      status,
      commentsCount: Math.floor(Math.random() * 20) + 1, // Random number between 1 and 20
      attachmentsCount: Math.floor(Math.random() * 30) + 1, // Random number between 1 and 30
      dueDate: new Date(2022, 11, 30), // Example due date: Dec 30, 2022
      priority: i % 2 === 0 ? "High" : "Low", // Alternating between High and Low priority
      createdAt: new Date(), // Current timestamp
    });
  }
  return tasks;
};

const seedTasks = async () => {
  try {
    await Task.deleteMany({}); // Clear existing tasks

    for (const status of statuses) {
      const tasks = createTasks(status);
      await Task.insertMany(tasks);
      console.log(`Inserted 10 tasks for status: ${status}`);
    }

    console.log("Seeding completed.");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding tasks:", error);
    mongoose.connection.close();
  }
};
