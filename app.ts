// src/app.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import userRoutes from "./src/services/users/routes";
import projectRoutes from "./src/services/project/routes";
import taskRoutes from "./src/services/task/routes";
import uploadRoutes from "./src/services/upload/routes";

import connectDB from "./src/config/db";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// CORS Middleware
app.use(cors({
  origin: '*', // Allow all origins (Change to specific domain in production)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true, // Allow cookies if needed
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Explicitly handle preflight requests
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.sendStatus(204);
});

// Routes
app.use("/api", userRoutes, projectRoutes, taskRoutes, uploadRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Global error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

export default app;
