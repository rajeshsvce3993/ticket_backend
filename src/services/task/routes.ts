import express from "express";
import { createTicket, GetAllTickets, updateTicketStatus } from "./controller";
import { authenticateToken, authorize } from "../../middleware/auth";

const router = express.Router();

router.get("/tickets", authenticateToken, GetAllTickets);
router.post("/tickets", authenticateToken, createTicket);
router.put("/ticket_status", authenticateToken, updateTicketStatus);





// // ✅ Create Task (Only Project Managers)
// router.post("/task", authenticateToken, authorize(["project_manager"]), createTask);

// // ✅ Assign Resources (Only Project Managers)
// router.put("/task/:taskId/resources", authenticateToken, authorize(["project_manager"]), assignResources);

// // ✅ Get Assigned Tasks (Only Employees)
// router.get("/task/assigned", authenticateToken, authorize(["employee"]), getTask);

// // ✅ Get Tickets (Allow Query Params)
// router.get("/tickets", authenticateToken, (req, res) => {
//   const { status } = req.query; // Extract status from query
//   console.log(`Fetching tickets with status: ${status}`);
//   getTask(req, res);
// });

export default router;
