import { Document } from 'mongoose';

export interface IVendor extends Document {
  userId: string;
  name: string;
  contact: string;
  website: string;
  facebook: string;
  location: string;
  linkedIn: string;
  twitter: string;
  founded: string;
}