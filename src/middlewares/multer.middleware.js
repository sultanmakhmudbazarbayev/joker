import multer from 'multer';
import upload from '../services/multer.service';

export const uploadImage = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error(err)
      return res.status(400).json({ error: 'Image upload error', message: err.message });
    } else if (err) {
      return res.status(500).json({ error: 'Internal server error', message: err.message });
    }

    // File uploaded successfully
    req.uploadedFilename = req.file.filename;
    next()
  });
};


export const uploadAudio = (req, res, next) => {
  upload.single('audio')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error(err)
      return res.status(400).json({ error: 'Audio upload error', message: err.message });
    } else if (err) {
      return res.status(500).json({ error: 'Internal server error', message: err.message });
    }

    // File uploaded successfully
    req.uploadedFilename = req.file.filename;
    next()
  });
};

export const uploadVideo = (req, res, next) => {
  upload.single('video')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.error(err)
      return res.status(400).json({ error: 'Video upload error', message: err.message });
    } else if (err) {
      return res.status(500).json({ error: 'Internal server error', message: err.message });
    }

    // File uploaded successfully
    req.uploadedFilename = req.file.filename;
    next()
  });
};