import express from "express";
import mongoose from "mongoose";

import userRoutes from "./src/Routes/userRoutes.js";
import profileRoutes from "./src/Routes/profileRoutes.js";
import authMiddleware from "./src/Middlewares/authenMiddleware.js";

const app = express();

const uri = `mongodb+srv://nhut03:123@cluster0.cm7cwus.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

app.use(express.json());

app.use("/user", userRoutes);
app.use("/profile", authMiddleware, profileRoutes);

mongoose
  .connect(uri)
  .then(() => console.log("Connected to database successfully"))
  .catch((error) => console.error("Database connection failed", error));

// Start the server
app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
});
