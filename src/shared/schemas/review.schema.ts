import { Schema } from 'mongoose';

export const ReviewSchema = new Schema({
  userId: { type: Schema.Types.String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: Schema.Types.String, required: true },
  picture: { type: Schema.Types.String, required: true },
  rating: { type: Schema.Types.Number, required: true },
  review: { type: Schema.Types.String, required: true },
});