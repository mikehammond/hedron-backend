import { Document } from "mongoose";

export interface IReview extends Document {
  userId: string;
  productId: string,
  name: string;
  picture: string;
  rating: number,
  review: string;
}