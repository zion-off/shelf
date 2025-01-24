import { Document, Types } from 'mongoose';

export interface IFolder extends Document {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  name: string;
  isPublic: boolean;
  created_at: Date;
  last_modified: Date;
}
