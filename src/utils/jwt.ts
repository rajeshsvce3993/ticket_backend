// src/utils/jwt.ts
import jwt from 'jsonwebtoken';

// Define the payload type (you can customize this based on your application)
interface JwtPayload {
  userId:string;
  name:string;
  mobile: string;
  role:string;
  // Add any other fields you want in the payload
}

// Function to generate a JWT
export const generateJwt = (payload: JwtPayload): string => {
  // Read the secret key from the environment
  const secretKey = process.env.JWT_SECRET as string;

  // Set the token expiration time (optional, here it's set to 1 hour)
 // const expiresIn = '1h';

  // Sign and generate the token
  const token = jwt.sign(payload, secretKey);
  
  return token;
};
