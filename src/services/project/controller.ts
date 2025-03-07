// src/controllers/userController.ts
import { Request, Response } from "express";
import {projectService} from "./service";
import { HttpStatus,ProjectConst } from "./constant";
import dotenv from "dotenv";
dotenv.config();

interface AuthRequest extends Request {
  user?: any; // Extend to add 'user' information to the request
}

export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    data.createdBy = req.user.userId;
    data.createdAt = new Date();
    const project =  await projectService.createProject(data)
    res.status(HttpStatus.OK).send({message:ProjectConst.SUCCESS,project});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await projectService.getAllProjects()
    res.status(HttpStatus.OK).send({message:ProjectConst.SUCCESS,projects});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
