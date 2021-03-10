import { Router } from 'express';

import { getImage, getImages, createImage, deleteImage, updateImage } from './image.service';
import multer from '../libs/multer';

const router = Router();

router.route('/images')
    .get(getImages)

router.route('/image/:id')
    .get(getImage)
    .post(multer.single('image'), createImage)
    .put(updateImage)
    .delete(deleteImage)

export default router;