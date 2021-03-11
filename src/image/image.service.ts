import { Response, Request } from 'express';
import { unlink } from 'fs-extra';
import path from 'path';

import { createOneImage, deleteImageById, getAllImages, getImageById, updateImageById } from './image.repository';

export const getImage = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const image = getImageById(id);
        if (image) {
            return res.json({ image });
        }
        else {
            return res.status(400).json({ message: 'Image not found' });
        }
    } catch (err) {
        throw err;
    }
};

export const getImages = async (req: Request, res: Response): Promise<Response> => {
    try {
        const images = getAllImages();
        if (images) {
            return res.json({ images });
        }
        else {
            return res.status(400).json({ message: 'Images not found' });
        }
    } catch (err) {
        throw err;
    }
};

export const createImage = async (req: Request, res: Response): Promise<Response> => {
    const { title, description } = req.body;
    const imagePath = req.file.path;
    try {
        const image = createOneImage(title, description, imagePath);
        return res.json({
            message: 'Image saved successfully',
            image
        });
    } catch (err) {
        throw err;
    }
};

export const updateImage = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const image = getImageById(id);
        if (image) {
            const updatedImage = await updateImageById(id, title, description);
            return res.json({
                massage: 'Image updated',
                updatedImage
            });
        } else {
            return res.status(400).json({ message: 'Image not found' });
        }
    } catch (err) {
        throw err;
    }
};

export const deleteImage = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const image = getImageById(id);
        if (image) {
            await deleteImageById(id);
            // @ts-ignore
            await unlink(path.resolve(image.imagePath));
            return res.json({
                message: 'Image deleted',
            });
        } else {
            return res.status(400).json({ message: 'Image not found' });
        }
    } catch (err) {
        throw err;
    }
};
