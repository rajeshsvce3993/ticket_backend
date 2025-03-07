import { Request, Response } from 'express';
import {  generateImageUrl }  from "./../../middleware/uploadMiddleware";


// Controller to handle the image upload logic
const uploadController = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check if a file is uploaded
//console.log(req)
    if (!req.file) {
       res.status(400).json({ message: 'No file uploaded.' }); // Return early
       return 
    }
    const imageUrl = generateImageUrl(req.file.path); // Generate correct URL


    // Send the path of the uploaded file (you could return a URL here)
     res.status(200).json({
      message: 'Image uploaded successfully.',
      url: imageUrl, // Provide the path to the uploaded image
    });
    return
  } catch (error) {
    console.error('Error uploading file:', error);

    // Send the error response, ensuring it's only called once
     res.status(500).json({
      message: 'Image upload failed.',
      error: error, // Send the error message for debugging
    });
    return
  }
};

export default uploadController;
