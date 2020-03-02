import { Schema } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ibmDiscoveryDocumentId: { type: String, required: true },
  trashed: { type: Boolean, default: false },
});