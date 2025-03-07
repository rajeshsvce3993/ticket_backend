import {Timesheet} from "./model"; // Import your timesheet model
import { ITimesheet} from "./model"; // Import the timesheet interface



class TimesheetService {
  // Define the logTimesheet method
  public async logTimesheet(timesheetData: ITimesheet) {
    const timesheet = new Timesheet(timesheetData);
    return await timesheet.save(); // Save timesheet to the database
  }

  // Define the getTimesheetByUserId method
  public async getTimesheetByUserId(userId:Object) {
    return await Timesheet.find({ userId: userId }) // get user by email id
  }


  public async fetchTasklogs() {
    return await Timesheet.aggregate([
      // Step 1: Convert string fields to ObjectId
      {
        $addFields: {
          taskId: { $toObjectId: "$taskId" }, // Convert taskId to ObjectId
          userId: { $toObjectId: "$userId" }, // Convert userId to ObjectId
          projectId: { $toObjectId: "$projectId" }, // Convert userId to ObjectId

        }
      },
      
      // Step 2: Lookup Task details (task name, description, and projectId)
      {
        $lookup: {
          from: 'tasks',                // Join with the 'tasks' collection
          localField: 'taskId',         // Reference the taskId field in the timesheet
          foreignField: '_id',          // Match the _id in the tasks collection
          as: 'taskDetails'             // Add the result to taskDetails array
        }
      },
      {
        $unwind: "$taskDetails"        // Flatten the taskDetails array, since each timesheet has one task
      },
    
      // Step 3: Lookup Project details (project name)
      {
        $lookup: {
          from: 'projects',            // Join with the 'projects' collection
          localField: 'projectId', // Use the projectId from taskDetails
          foreignField: '_id',         // Match the _id in the projects collection
          as: 'projectDetails'         // Add the result to projectDetails array
        }
      },
      {
        $unwind: "$projectDetails"     // Flatten the projectDetails array
      },
    
      // Step 4: Lookup User details (user name)
      {
        $lookup: {
          from: 'users',               // Join with the 'users' collection
          localField: 'userId',         // Reference the userId field in the timesheet
          foreignField: '_id',          // Match the _id in the users collection
          as: 'userDetails'             // Add the result to userDetails array
        }
      },
      {
        $unwind: "$userDetails"        // Flatten the userDetails array
      },
    
      // Step 5: Project the required fields
      {
        $project: {
          userName: "$userDetails.userName",            // User's name
          projectName: "$projectDetails.projectName", // Project name
          taskName: "$taskDetails.taskName",         // Task name
          taskDescription: "$taskDetails.taskDescription", // Task description
          loggedHours: "$loggedHours",               // Logged hours from timesheet
          _id: 0                                     // Exclude _id from the result
        }
      }
    ])
   }

   public async fetchTasklogsByEmployee(userId:String) {
    return await Timesheet.aggregate([

      {$match:{userId:userId}},
      // Step 1: Convert string fields to ObjectId
      {
        $addFields: {
          taskId: { $toObjectId: "$taskId" }, // Convert taskId to ObjectId
          userId: { $toObjectId: "$userId" }, // Convert userId to ObjectId
          projectId: { $toObjectId: "$projectId" }, // Convert userId to ObjectId

        }
      },
      
      // Step 2: Lookup Task details (task name, description, and projectId)
      {
        $lookup: {
          from: 'tasks',                // Join with the 'tasks' collection
          localField: 'taskId',         // Reference the taskId field in the timesheet
          foreignField: '_id',          // Match the _id in the tasks collection
          as: 'taskDetails'             // Add the result to taskDetails array
        }
      },
      {
        $unwind: "$taskDetails"        // Flatten the taskDetails array, since each timesheet has one task
      },
    
      // Step 3: Lookup Project details (project name)
      {
        $lookup: {
          from: 'projects',            // Join with the 'projects' collection
          localField: 'projectId', // Use the projectId from taskDetails
          foreignField: '_id',         // Match the _id in the projects collection
          as: 'projectDetails'         // Add the result to projectDetails array
        }
      },
      {
        $unwind: "$projectDetails"     // Flatten the projectDetails array
      },
    
      // Step 4: Lookup User details (user name)
      {
        $lookup: {
          from: 'users',               // Join with the 'users' collection
          localField: 'userId',         // Reference the userId field in the timesheet
          foreignField: '_id',          // Match the _id in the users collection
          as: 'userDetails'             // Add the result to userDetails array
        }
      },
      {
        $unwind: "$userDetails"        // Flatten the userDetails array
      },
    
      // Step 5: Project the required fields
      {
        $project: {
          userName: "$userDetails.userName",            // User's name
          projectName: "$projectDetails.projectName", // Project name
          taskName: "$taskDetails.taskName",         // Task name
          taskDescription: "$taskDetails.taskDescription", // Task description
          loggedHours: "$loggedHours",               // Logged hours from timesheet
          _id: 0                                     // Exclude _id from the result
        }
      }
    ])
   }

}

// Export an instance of TimesheetService
export const timesheetService = new TimesheetService();
