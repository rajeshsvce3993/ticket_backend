// src/app.ts
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/services/users/routes";
import projectRoutes from "./src/services/project/routes";
import taskRoutes from "./src/services/task/routes";
import uploadRoutes from "./src/services/upload/routes";
const path = require("path");



import connectDB from "./src/config/db";
import cors from 'cors';


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

//cors
app.use(cors());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));



// Routes
app.use("/api", userRoutes,projectRoutes,taskRoutes,uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Global error handling, if needed
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default app;
