import multer from 'multer';
const path = require("path");
const fs = require("fs");

// Ensure 'uploads/' folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Define storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File filter to allow only image files
const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const isMimeTypeValid = allowedFileTypes.test(file.mimetype);
  const isExtnameValid = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (isMimeTypeValid && isExtnameValid) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG, PNG, and GIF are allowed."));
  }
};

// Set file upload limits (max size: 10MB)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Function to generate the image URL
function generateImageUrl(filePath: string) {
  return `http://localhost:8000/${filePath.replace(/\\/g, '/')}`;
}

export { upload, generateImageUrl };
