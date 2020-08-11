import { Router } from 'express';

import {getPhoto, getPhotos, createPhoto, deletePhoto, updatePhoto} from '../controllers/photo';
import multer from '../libs/multer';


const router = Router();

router.route('/photos')
    .get(getPhotos)
    .post(multer.single('image'), createPhoto)

router.route('/photos/:id')
    .get(getPhoto)
    .delete(deletePhoto)
    .put(updatePhoto)

export default router;