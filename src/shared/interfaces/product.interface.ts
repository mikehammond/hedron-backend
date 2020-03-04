import { Document } from 'mongoose';

import { IAttachment } from './attachment.interface';

export interface IProduct extends Document {
  userId: string;
  name: string;
  description: string;
  ibmDiscoveryDocumentId: string;
  attachments: IAttachment[]
  status: string;
  archived: boolean;
}