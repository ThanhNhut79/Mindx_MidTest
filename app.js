import express from "express";
import mongoose from "mongoose";

import userRoutes from "./src/Routes/userRoutes.js";
import profileRoutes from "./src/Routes/profileRoutes.js";
import authMiddleware from "./src/Middlewares/authenMiddleware.js";

// Load environment variables from a .env file

// Initialize Express app
const app = express();

// Connect to MongoDB database
const uri = `mongodb+srv://nhut03:123@cluster0.cm7cwus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Middleware
app.use(express.json());

// Routes
// app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/profile", authMiddleware, profileRoutes);

// Connect to MongoDB database
mongoose
  .connect(uri)
  .then(() => console.log("Connected to database successfully"))
  .catch((error) => console.error("Database connection failed", error));

// Start the server
app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
