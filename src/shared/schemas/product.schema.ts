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
  description: { type: String, required: true },
});

const SelectableSchema = new Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
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
  description: { type: String, required: true },
  values: [SelectableSchema],
  features: [SelectableSchema],
  pricing: [SelectableSchema],
  devices: [SelectableSchema],
  categories: [SelectableSchema],
  plans: [PlanSchema],
  logo: AttachmentSchema,
  featured: AttachmentSchema,
  attachments: [AttachmentSchema],
});

export const DemoRequestSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});