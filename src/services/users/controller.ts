// src/controllers/userController.ts
import { Request, Response } from "express";
import {userService} from "./service";
import { HttpStatus,UserConst } from "./constant";
import bcrypt from 'bcrypt';
import { generateJwt } from '../../utils/jwt';

import dotenv from "dotenv";
dotenv.config();



export const createUser = async (req: Request, res: Response) => {
  try {
    const data=req.body;
    const user = await userService.findUser(data.mobile);
    if(user){
      res.status(HttpStatus.BAD_REQUEST).json({ message: UserConst.USER_ALREADY_EXISTS });
      return
    }
    const saltRounds = Number(process.env.SALT_ROUND);
    data.password = await bcrypt.hash(data.password, saltRounds);
    data.createdAt = new Date();
    await userService.createUser(data);
    res.status(HttpStatus.OK).send({message:UserConst.SUCCESS});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { mobile, password } = req.body;
    const user = await userService.findUser(mobile);
    if(user){
        const hashedPassword = user.password;
        const verifyPassword = await bcrypt.compare(password, hashedPassword)
        if(verifyPassword){
            const token = generateJwt({userId:String(user._id),name:user.name, mobile: user.mobile, role: user.role });
             await userService.updateLogin(true,mobile);
            const userDetails = {
              userId:String(user._id),
              name:user.name,
              mobile:user.mobile,
              role:user.role
            } 
            res.status(HttpStatus.OK).send({message:UserConst.SUCCESS, token:token, data:userDetails});
            return
        }else{
            res.status(HttpStatus.UNAUTHORIZED).send({message:UserConst.FAILURE});  
            return
        }
    }
    else{
        res.status(HttpStatus.UNAUTHORIZED).send({message:UserConst.NOT_FOUND});  
        return
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getAllEmployee = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllEmployees();
  
    res.status(HttpStatus.OK).send({message:UserConst.SUCCESS,users:users});
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const createBank = async (req: Request, res: Response) => {
  try {
    const data=req.body;
    await userService.createBank(data);
    res.status(HttpStatus.OK).send({message:UserConst.SUCCESS});
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error });
  }
};

export const getAllBank = async (req: Request, res: Response) => {
  try {
    const bank = await userService.getAllBanks();
  
    res.status(HttpStatus.OK).send({message:UserConst.SUCCESS,bank});
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
