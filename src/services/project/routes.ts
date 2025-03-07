import express from "express";
import {  createProject,
    getAllProjects,} from "./controller";
import { authenticateToken, authorize } from './../../middleware/auth';

const router = express.Router();
// Only Super Admin can create projects
router.post('/projects', authenticateToken, authorize(['super_admin']), createProject);

// All roles can view projects
router.get('/projects', authenticateToken, authorize(['super_admin', 'project_manager', 'employee']), getAllProjects);




export default router;
