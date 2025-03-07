// src/models/userModel.ts
import mongoose, { Document, Schema, Types } from "mongoose";
import {UserConst } from "./constant";

export interface IUser extends Document {
  name: string;
  mobile: string;
  password: string;
  role:string;
  status:string;
  isActive:boolean;
  isLogin:boolean;
  createdAt?:Date;
  createdBy?:string;
  updatedAt?:Date;
  updatedBy?:string;
}

export interface IBank extends Document {
  name: string;
  location: string;
  adminDetails: [];
  createdAt?:Date;
  createdBy?:string;
  updatedAt?:Date;
  updatedBy?:string;
}

const userSchema: Schema = new Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:{type:String, required:true},
  status:{type:String, default:UserConst.ACTIVE},
  isActive:{type:Boolean, default:true},
  isLogin:{type:Boolean, default:false},
  createdAt:{type:Date, default: Date()},
  createdBy: {type:String, default:null},
  updatedAt:{type:Date, default: Date()},
  updatedBy: {type:String, default:null},
});

const bankSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String },
  adminDetails: [{name:{  type: String, required: true }}],
  createdAt:{type:Date, default: Date()},
  createdBy: {type:String, default:null},
  updatedAt:{type:Date, default: Date()},
  updatedBy: {type:String, default:null},
});


const User = mongoose.model<IUser>("User", userSchema);
const Bank = mongoose.model<IBank>("Bank", bankSchema);

 export default {
User,
Bank
 } 



export  {
  User,
  Bank
} 


