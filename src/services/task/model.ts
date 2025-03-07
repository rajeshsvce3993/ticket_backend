
import mongoose, { Document, ObjectId, Schema, Types } from "mongoose";
export interface ITask extends Document {
  user: string;
  bank:string;
  location:string;
  ticketDetails:String;
  bankAdmin:string;
  workList:[];
  images:[];
  status:String;
  createdAt?:Date;
  createdBy?:string;
  updatedAt?:Date;
  updatedBy?:string;
}


const taskSchema: Schema = new Schema({
  user: { type: String, required: true },
  bank: { type: String, required: true },
  location:  {  type: String, required: true   },
  ticketDetails:  {  type: String, required: true   },
  bankAdmin:  {  type: String, required: true   },
  workList: [{  type: String, default :[] }],
  images: [{  type: String, required: true }],
  status:  {  type: String, default: "pending"   },
  createdAt:{type:Date, default: Date()},
  createdBy: {type:String, default:null},
  updatedAt:{type:Date, default: Date()},
  updatedBy: {type:String, default:null},
});


const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;

export  {
  Task
} 

