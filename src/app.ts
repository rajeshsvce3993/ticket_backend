import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";

import uploadRoutes from './services/upload/routes';
import userRoutes from "./services/users/routes";
import projectRoutes from "./services/project/routes";
import taskRoutes from "./services/task/routes";

import connectDB from "./config/db";

dotenv.config();

const app = express();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes,projectRoutes,taskRoutes,uploadRoutes);
app.use('/uploads', express.static('uploads'));



export default app;
