import { Router } from 'express';
import uploadController from './controller';
import {upload} from './../../middleware/uploadMiddleware';

const router: Router = Router();

// POST route for uploading an image
// Use multer middleware to handle the file upload, then call the controller
router.post('/upload', upload.single('file'), uploadController);

export default router;