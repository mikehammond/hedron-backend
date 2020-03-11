import { Schema } from 'mongoose';

export const DemoRequestSchema = new Schema({
  sender: { type: Schema.Types.String, required: true },
  reciever: { type: Schema.Types.String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  firstName: { type: Schema.Types.String, required: true },
  lastName: { type: Schema.Types.String, required: true },
  phoneNumber: { type: Schema.Types.String, required: true },
  email: { type: Schema.Types.String, required: true },
  message: { type: Schema.Types.String, required: true },
});