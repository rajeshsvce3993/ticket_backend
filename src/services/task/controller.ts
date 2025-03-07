// src/controllers/userController.ts
import { Request, Response } from "express";
import {taskService} from "./service";
import { HttpStatus,TaskConst } from "./constant";
import dotenv from "dotenv";
dotenv.config();

interface AuthRequest extends Request {
  user?: any; // Extend to add 'user' information to the request
}

export const createTicket = async (req: AuthRequest, res: Response) => {
  try {
    const data = req.body;
    data.createdBy = req.user.id;
    data.createdAt = new Date();
    const task =  await taskService.createTask(data)
    res.status(HttpStatus.OK).send({message:TaskConst.SUCCESS});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};



export const GetAllTickets = async (req: AuthRequest, res: Response) => {
  try {
    const status = String(req.query?.status || "");
    const mobile = req.user.mobile
    const role = req.user.role
    let tickets =[];

    if(role=='ADMIN'){
      tickets = await taskService.getAllTickets(status)
    }
    else{
      tickets = await taskService.getTickets(status,mobile)
    }

     res.status(HttpStatus.OK).send({message:TaskConst.SUCCESS,tickets});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateTicketStatus = async (req: AuthRequest, res: Response) => {
  try {
    const {taskId,status} = req.body;

    const tickets =await taskService.updateTicketStatus(taskId,status);

     res.status(HttpStatus.OK).send({message:TaskConst.SUCCESS});
  } catch (error) {
    res.status(500).json({ error: error });
  }
};






