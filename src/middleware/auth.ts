import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import {userService} from "./../services/users/service";


const JWT_SECRET = process.env.JWT_SECRET as string;

interface AuthRequest extends Request {
  user?: any; // Extend to add 'user' information to the request
}

// Middleware function to verify JWT token
export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Expect token in "Authorization: Bearer <token>" format

  if (!token) {
    res.status(401).json({ message: 'Access denied, no token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user data to request
    const user = await userService.findUser(req.user.mobile);
    if(user?.isLogin){
        next(); // Proceed to the next middleware or route handler 
    }
    else{
        res.status(403).json({ message: 'Invalid or expired token' });
    }
  } catch (err) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

// Role-based authorization
export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized: User not authenticated.' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Forbidden: Access is denied.' });
      return;
    }

    next();
  };
};