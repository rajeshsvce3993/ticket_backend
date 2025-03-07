import { body } from "express-validator";

export const userCreateValidationRules = [
  body("name").isString().isLength({ min: 3, max: 30 }).withMessage("Name must be between 3 and 30 characters"),
  body("mobile").isString().isLength({ min: 10, max: 13 }).withMessage("Name must be between 3 and 30 characters"),
  body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
];




