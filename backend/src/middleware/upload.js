import multer from 'multer';
import path   from 'path';

// Stockage sur disque dans ./uploads/
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (_req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

export const upload = multer({ storage });
