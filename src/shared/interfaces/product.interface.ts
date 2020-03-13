import { Document } from 'mongoose';

export interface IAttachment extends Document {
  filename: string;
  url: string;
  mimetype: string;
  size: number
}

export interface ISelectable extends Document {
  label: string;
  value: string;
}

export interface IPlan extends Document {
  name: string;
  price: string;
  features: ISelectable[];
}

export interface IValue extends Document {
  name: string;
  description: string;
}

export interface IProduct extends Document {
  userId: string;
  ibmDiscoveryDocumentId: string;
  status: string;
  archived: boolean;
  name: string;
  summary: string;
  description: string;
  values: IValue[];
  features: ISelectable[];
  pricing: ISelectable[];
  devices: ISelectable[];
  categories: ISelectable[];
  plans: IPlan[];
  logo: IAttachment;
  featured: IAttachment;
  attachments: IAttachment[]
}
