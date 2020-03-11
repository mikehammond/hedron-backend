import { Document } from 'mongoose';

export interface IDemoRequest extends Document {
  sender: string,
  reciever: string,
  productId: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  message: string,
}