import { body } from "express-validator";

export const userCreateValidationRules = [
  body("name").isString().isLength({ min: 3, max: 30 }).withMessage("Name must be between 3 and 30 characters"),
  body("dob").isString().isLength({ min: 10, max: 10 }).withMessage("Invalid Date of birth"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
];




