import { Response, Request } from 'express';
import fs from 'fs-extra';
import path from 'path';

import Photo from '../models/Photo';

export const getPhotos = async (req: Request, res: Response): Promise<Response> => {
    try {
        const photos = await Photo.find();
        return res.json(photos);
    } catch {
        return res.json({ message: 'При получении изображений что-то пошло не так' });
    }
};

export const getPhoto = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const photo = await Photo.findById(id);
        if (photo) return res.json({ photo });
        else return res.json({ message: 'Изображение не найдено' });
    } catch {
        return res.json({ message: 'При получении изображения что-то пошло не так' });
    }
};

export const createPhoto = async (req: Request, res: Response): Promise<Response> => {
    const { title, description } = req.body;
    try {
        const newPhoto = {
            title,
            description,
            imagePath: req.file.path
        };
        const photo = new Photo(newPhoto);
        await photo.save();
        return res.json({
            message: 'Изображение сохранено',
            photo
        });
    } catch {
        return res.json({ message: 'При сохранении изображения что-то пошло не так' });
    }
};

export const deletePhoto = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
        const photo = await Photo.findById(id);
        if (photo) {
            await Promise.all([
                Photo.findByIdAndDelete(id),
                fs.unlink(path.resolve(photo.imagePath))
            ]);
            return res.json({
                message: 'Изображение удалено',
                photo
            });
        } else {
            return res.json({ message: 'Изображение не найдено' });
        }
    } catch {
        return res.json({ message: 'При удалении изображения что-то пошло не так' });
    }
};

export const updatePhoto = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const photo = await Photo.findById(id);
        if (photo) {
            const updatedPhoto = await Photo.findByIdAndUpdate(id, {
                title, description
            }, {new: true});
            return res.json({
                massage: 'Данные для изображения изменены',
                updatedPhoto
            });
        } else {
            return res.json({ message: 'Изображение не найдено' });
        }
    } catch {
        return res.json({ message: 'При обновлении данных изображения что-то пошло не так' });
    }
};