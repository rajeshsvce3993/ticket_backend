import express from "express";
import {  logTimesheet,
    getTimesheetsByUser, getAllTaskLoggedHours, getAllTaskLoggedHoursByEmployee} from "./controller";
import { authenticateToken, authorize } from './../../middleware/auth';

const router = express.Router();
// Only Employees can log timesheets
router.post('/timesheet', authenticateToken, authorize(['employee']), logTimesheet);

// Employees can view their timesheets
router.get('/timesheet', authenticateToken, authorize(['employee']), getTimesheetsByUser);

router.get('/task/logged', authenticateToken, authorize(['project_manager']), getAllTaskLoggedHours);
router.get('/task/employee', authenticateToken, authorize(['employee']), getAllTaskLoggedHoursByEmployee);



export default router;
