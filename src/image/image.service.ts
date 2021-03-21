import { Response, Request } from 'express';
import { unlink } from 'fs-extra';
import path from 'path';

import { createOneImage, deleteImageById, getAllImages, getImageById, updateImageById } from './image.repository';

export const getImage = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const image = await getImageById(id);
    if (!image) {
        return res.status(400).json({ message: 'Image not found' });
    }
    return res.json({ image });
};

export const getImages = async (req: Request, res: Response): Promise<Response> => {
    const images = await getAllImages();
    if (!images) {
        return res.status(400).json({ message: 'Images not found' });
    }
    return res.json({ images });
};

export const createImage = async (req: Request, res: Response) => {
    const { title, description } = req.body;
    const imagePath = req.file.path;
    const image = await createOneImage(title, description, imagePath);
    return res.status(201).json({
        message: 'Image saved successfully',
        data: { image }
    });
};

export const updateImage = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { title, description } = req.body;
    const image = await getImageById(id);
    if (!image) {
        return res.status(400).json({ message: 'Image not found' });
    }
    const updatedImage = await updateImageById(id, title, description);
    return res.json({
        massage: 'Image updated',
        data: { updatedImage }
    });
};

export const deleteImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const image = await getImageById(id);
    if (!image) {
        return res.status(400).json({ message: 'Image not found' });
    }
    await deleteImageById(id);
    await unlink(path.resolve(image.imagePath));
    return res.json({
        message: 'Image deleted',
    });
};
