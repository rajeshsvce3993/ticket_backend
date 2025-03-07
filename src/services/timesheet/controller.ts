// src/controllers/userController.ts
import { Request, Response } from "express";
import {timesheetService} from "./service";
import { HttpStatus,TimesheetConst } from "./constant";
import dotenv from "dotenv";
dotenv.config();

interface AuthRequest extends Request {
  user?: any; // Extend to add 'user' information to the request
}

export const logTimesheet = async (req: AuthRequest, res: Response) => {
  try {

    const data = req.body;
    data.loggedHours = Object.values(data.loggedHours)
  .map(Number) // Convert each string value to a number
  .reduce((acc, curr) => acc + curr, 0); // Sum up the numbers
    data.userId = req.user.userId
    data.createdBy = req.user.userId;
    data.createdAt = new Date();
    const timesheet =  await timesheetService.logTimesheet(data)
    res.status(HttpStatus.OK).send({message:TimesheetConst.SUCCESS});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getTimesheetsByUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.userId
    const timesheets = await timesheetService.getTimesheetByUserId(userId)
    res.status(HttpStatus.OK).send({message:TimesheetConst.SUCCESS,timesheets});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllTaskLoggedHours = async (req: AuthRequest, res: Response) => {
  try {
    const taskLogs = await timesheetService.fetchTasklogs()
    res.status(HttpStatus.OK).send({message:TimesheetConst.SUCCESS,taskLogs:taskLogs});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAllTaskLoggedHoursByEmployee = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.userId
    const taskLogs = await timesheetService.fetchTasklogsByEmployee(userId)
    res.status(HttpStatus.OK).send({message:TimesheetConst.SUCCESS,taskLogs:taskLogs});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};