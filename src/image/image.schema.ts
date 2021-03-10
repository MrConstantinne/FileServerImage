import { Schema, model } from 'mongoose';
import { ImageInterface } from './image.interface';

const schema = new Schema({
    title: String,
    description: String,
    imagePath: String
});

export default model<ImageInterface>('image', schema);