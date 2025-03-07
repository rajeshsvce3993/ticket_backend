import {Project} from "./model"; // Import your user model
import { IProject} from "./model"; // Import the user interface
import { ProjectConst } from "./constant";



class ProjectService {
  // Define the createProject method
  public async createProject(projectData: IProject) {
    const project = new Project(projectData);
    return await project.save(); // Save project to the database
  }

  // Define the Get All Projects method
  public async getAllProjects() {
    return await Project.find({ status: ProjectConst.ACTIVE }); // get all projects
  }

}

// Export an instance of ProjectService
export const projectService = new ProjectService();
