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

export default multer({ storage });