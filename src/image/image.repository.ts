import Image from './image.schema';
import { ImageInterface } from './image.interface';

export const getImageById = async (id: string): Promise<ImageInterface | null> => {
  return Image.findById(id);
}

export const getAllImages = async (): Promise<ImageInterface[] | null> => {
  return Image.find();
}

export const createOneImage = async (...args: string[]): Promise<ImageInterface> => {
  return new Image({ ...args }).save();
}

export const deleteImageById = async (id: string) => {
  return Image.findByIdAndDelete(id);
}

export const updateImageById = async (id: string, title: string, description: string) => {
  return Image.findByIdAndUpdate(id, {
    title, description
  }, { new: true });
}
