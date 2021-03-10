import { Document } from 'mongoose';

export interface ImageInterface extends Document {
  title: string;
  description: string;
  imagePath: string;
}