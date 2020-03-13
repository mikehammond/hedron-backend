import { Document } from 'mongoose';

export interface IDemoRequest extends Document {
  sender: string,
  receiver: string,
  productId: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  company: string,
  position: string,
  website: string,
  numberOfEmployees: string,
  message: string,
}