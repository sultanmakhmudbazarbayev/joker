import multer from 'multer';
import upload from '../services/multer.service';

const uploadImage = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log('image1')
      // Multer error (e.g., file size exceeded)
      console.error(err)
      return res.status(400).json({ error: 'File upload error', message: err.message });
    } else if (err) {
      console.log('image2')
      // Other unexpected errors
      return res.status(500).json({ error: 'Internal server error', message: err.message });
    }

    // File uploaded successfully
    req.uploadedFilename = req.file.filename;
    next()
  });
};

export default uploadImage;
