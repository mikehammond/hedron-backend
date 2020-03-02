import { Document } from 'mongoose';

export interface Product extends Document {
  name: string;
  description: string;
  ibmDiscoveryDocumentId: string;
  trashed: boolean;
}