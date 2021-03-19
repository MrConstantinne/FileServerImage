import { Router } from 'express';

import { getImage, getImages, createImage, deleteImage, updateImage } from './image.service';
import multer from '../libs/multer';

const router = Router();

router.route('/image/:id')
  .get(getImage)
  .put(updateImage)
  .delete(deleteImage)

router.route('/images')
  .get(getImages)
  .post(multer.single('image'), createImage)

export default router;