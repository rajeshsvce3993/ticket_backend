import express from "express";
import { createUser, login, getAllEmployee, createBank,getAllBank} from "./controller";
import { userCreateValidationRules } from "./validator";
import { validate } from "./../../middleware/validator";



const router = express.Router();

router.post("/signup",userCreateValidationRules, validate, createUser);
router.post("/signin", login);
router.get("/users", getAllEmployee);
router.post("/bank", createBank);
router.get("/bank", getAllBank);







export default router;
