import { Schema } from 'mongoose';

const AttachmentSchema = new Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
});

const PlanSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  details: { type: String, required: true },
});

export const ReviewSchema = new Schema({
  userId: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  review: { type: String, required: true },
});

export const FAQSchema = new Schema({
  userId: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

export const ProductSchema = new Schema({
  userId: { type: String, required: true },
  ibmDiscoveryDocumentId: { type: String, required: true },
  status: { type: String, default: 'pending', enum: ['pending', 'approved', 'denied'] },
  archived: { type: Boolean, default: false },
  name: { type: String, required: true, unique: true },
  featured: AttachmentSchema,
  description: { type: String, required: true },
  values: [{ type: String, required: true }],
  features: [{ type: String, required: true }],
  pricing: [{ type: String, required: true }],
  devices: [{ type: String, required: true }],
  categories: [{ type: String, required: true }],
  plans: [PlanSchema],
  logo: AttachmentSchema,
  attachments: [AttachmentSchema],
});