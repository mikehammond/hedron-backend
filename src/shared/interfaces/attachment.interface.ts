import { Document } from 'mongoose';

export interface IAttachment extends Document {
  filename: string;
  url: string;
  mimetype: string;
  size: number
}