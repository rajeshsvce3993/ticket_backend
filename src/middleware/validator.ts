import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Explicit return type for the middleware is void
export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return; // Make sure to return after sending the response to prevent calling `next()`
  }

  next(); // Call next() if there are no validation errors
};
