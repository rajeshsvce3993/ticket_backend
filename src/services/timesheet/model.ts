

import mongoose, { Document, ObjectId, Schema, Types } from "mongoose";

export interface ITimesheet extends Document {
  userId: string;
  taskId: string;
  projectId: string;
  loggedHours:number;
  createdAt?:Date;
  createdBy?:string;
  updatedAt?:Date;
  updatedBy?:string;
}

const timesheetSchema: Schema = new Schema({
  userId :{ type: String, required: true },
  taskId: { type: String, required: true },
  projectId: { type: String, required: true },
  loggedHours: { type: Number, required: true },
  createdAt:{type:Date, default: Date()},
  createdBy: {type:String, default:null},
  updatedAt:{type:Date, default: Date()},
  updatedBy: {type:String, default:null},
});


const Timesheet = mongoose.model<ITimesheet>("Timesheet", timesheetSchema);
export default Timesheet;

export  {
  Timesheet
} 
