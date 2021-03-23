import { Request, Response, Router } from 'express';
import { check, validationResult } from 'express-validator';

import { getImage, getImages, createImage, deleteImage, updateImage } from './image.service';
import multer from '../libs/multer';

const router = Router();

const validationCheckErrors = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
}

router.get('/images', getImages)

router.post('/images', [
    check('title').notEmpty().isString(),
    check('description').notEmpty().isString()
  ],
  async (req: Request, res: Response) => {
    await validationCheckErrors(req, res);
    await multer.single('image');
    return createImage(req, res);
});

router.get('/image/:id',
  check('id').notEmpty(),
  async (req: Request, res: Response) => {
    await validationCheckErrors(req, res);
    return getImage(req, res);
});

router.put('/image/:id',
  [
    check('id').notEmpty(),
    check('title').notEmpty().isString(),
    check('description').notEmpty().isString(),
  ], async (req: Request, res: Response) => {
    await validationCheckErrors(req, res);
    return updateImage(req, res);
});

router.delete('/image/:id',
  check('id').notEmpty(),
  async (req: Request, res: Response) => {
    await validationCheckErrors(req, res);
    return deleteImage(req, res);
  });

export default router;