import mongoose, { Document, Schema, Types } from "mongoose";
import {ProjectConst } from "./constant";

export interface IProject extends Document {
  projectName: string;
  projectDescription:string;
  clientName:string;
  startDate:Date;
  endDate:Date;
  status:string;
  isActive:boolean;
  createdAt?:Date;
  createdBy?:string;
  updatedAt?:Date;
  updatedBy?:string;
}

const projectSchema: Schema = new Schema({
  projectName: { type: String, required: true },
  projectDescription: { type: String, required: true },
  clientName: { type: String, required: true },
  startDate:{type:Date, default: null},
  endDate:{type:Date, default: null},
  status:{type:String, default:ProjectConst.ACTIVE},
  isActive:{type:Boolean, default:true},
  createdAt:{type:Date, default: Date()},
  createdBy: {type:String, default:null},
  updatedAt:{type:Date, default: Date()},
  updatedBy: {type:String, default:null},
});


const Project = mongoose.model<IProject>("Project", projectSchema);
export default Project;

export  {
  Project
} 
