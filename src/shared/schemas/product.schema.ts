import { Schema } from 'mongoose';

const AttachmentSchema = new Schema({
  filename: { type: Schema.Types.String, required: true },
  url: { type: Schema.Types.String, required: true },
  mimetype: { type: Schema.Types.String, required: true },
  size: { type: Schema.Types.Number, required: true },
});

const ValueSchema = new Schema({
  name: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
});

const SelectableSchema = new Schema({
  label: { type: Schema.Types.String, required: true },
  value: { type: Schema.Types.String, required: true },
});

const PlanSchema = new Schema({
  name: { type: Schema.Types.String, required: true },
  price: { type: Schema.Types.String, required: true },
  features: [SelectableSchema],
});

export const ReviewSchema = new Schema({
  userId: { type: Schema.Types.String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  review: { type: Schema.Types.String, required: true },
});

export const FAQSchema = new Schema({
  userId: { type: Schema.Types.String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  question: { type: Schema.Types.String, required: true },
  answer: { type: Schema.Types.String, required: true },
});

export const ProductSchema = new Schema({
  userId: { type: Schema.Types.String, required: true },
  ibmDiscoveryDocumentId: { type: Schema.Types.String, required: true },
  status: { type: Schema.Types.String, default: 'pending', enum: ['pending', 'approved', 'denied'] },
  archived: { type: Schema.Types.Boolean, default: false },
  name: { type: Schema.Types.String, required: true, unique: true },
  slug: { type: Schema.Types.String, required: true, unique: true },
  summary: { type: Schema.Types.String, required: true },
  description: { type: Schema.Types.String, required: true },
  values: [ValueSchema],
  features: [SelectableSchema],
  pricing: [SelectableSchema],
  devices: [SelectableSchema],
  categories: [SelectableSchema],
  plans: [PlanSchema],
  logo: AttachmentSchema,
  featured: AttachmentSchema,
  attachments: [AttachmentSchema],
});
