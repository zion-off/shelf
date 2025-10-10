import { Document, Types } from 'mongoose';

export interface IApiKey extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  keyHash: string;
  name?: string;
  createdAt: Date;
  lastUsedAt?: Date;
  isActive: boolean;
}
