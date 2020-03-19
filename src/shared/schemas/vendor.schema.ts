import { Schema } from 'mongoose';

export const VendorSchema = new Schema({
  userId: { type: Schema.Types.String, required: true, unique: true },
  name: { type: Schema.Types.String, required: true, unique: true },
  contact: { type: Schema.Types.String, required: true, unique: true },
  website: { type: Schema.Types.String, required: true, unique: true },
  facebook: { type: Schema.Types.String, required: true, unique: true },
  location: { type: Schema.Types.String, required: true },
  linkedIn: { type: Schema.Types.String, required: true, unique: true },
  twitter: { type: Schema.Types.String, required: true, unique: true },
  founded: { type: Schema.Types.String, required: true },
});