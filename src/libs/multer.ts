import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 } from 'uuid';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename(req: Request,
             file: Express.Multer.File,
             callback: (error: (Error | null), filename: string) => void) {
        callback(null, v4() + path.extname(file.originalname));
    }
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: (Error | null), filename: boolean) => void) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}


export default multer({
    storage,
    fileFilter,
    limits
});