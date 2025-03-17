import {Task} from "./model"; // Import your user model
import { ITask} from "./model"; // Import the user interface
import mongoose from 'mongoose';




class TaskService {
  // Define the createTask method
  public async createTask(taskData: ITask) {
    const task = new Task(taskData);
    return await task.save(); // Save project to the database
  }


  public async updateTicketStatus(tickId: string,status: string) {
    const objectId = new mongoose.Types.ObjectId(tickId);
    const result = await Task.findOneAndUpdate(
      {_id: objectId },
      { $set: { status: status
       } });
      return result
  }

  public async getAllTickets(status:string) {
    console.log("status",status)
    const result = await Task.aggregate([
      {
        $match: { status: status }
      },
      {
        $addFields: {
          userObjectId: { $toObjectId: "$user" },
          bankObjectId: { $toObjectId: "$bank" }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "userObjectId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $lookup: {
          from: "banks",
          localField: "bankObjectId",
          foreignField: "_id",
          as: "bankDetails"
        }
      },
      {
        $unwind: "$userDetails"
      },
      {
        $unwind: "$bankDetails"
      },      
      {
        $unset: ["userObjectId", "bankObjectId"] // Remove temporary fields
      },
      {$project:{
        "ticketName":"$ticketDetails",
        "bankName":"$bankDetails.name",
        "userName":"$userDetails.name",
        "taskList":"$workList",
        "images":"$images",
        "location":"$location",
        "bankAdmin":"$bankAdmin",
        "date": {
          "$dateToString": {
            "format": "%d-%m-%Y",
            "date": "$createdAt"
          }
        }
      }}
    ]);
    return result;
   }

   public async getTickets(status:string,userId:string) {
    return await Task.aggregate([
     {$match:{status:status,user:userId}},
     {
       $addFields: {
         userObjectId: { $toObjectId: "$user" },
         bankObjectId: { $toObjectId: "$bank" }
       }
     },
     {
       $lookup: {
         from: "users",
         localField: "userObjectId",
         foreignField: "_id",
         as: "userDetails"
       }
     },
     {
       $lookup: {
         from: "banks",
         localField: "bankObjectId",
         foreignField: "_id",
         as: "bankDetails"
       }
     },
     {
      $unwind: "$userDetails"
    },
    {
      $unwind: "$bankDetails"
    },
     {
       $unset: ["userObjectId", "bankObjectId"] // Remove temporary fields
     },
     {$project:{
       "ticketName":"$ticketDetails",
       "bankName":"$bankDetails.name",
       "userName":"$userDetails.name",
       "taskList":"$workList",
       "images":"$images",
       "location":"$location",
       "bankAdmin":"$bankDetails.adminDetails.name",
     }}
    ]);
   }
  }
  

  
// Export an instance of TaskService
export const taskService = new TaskService();
