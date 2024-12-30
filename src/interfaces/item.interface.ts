import { Document, Types } from 'mongoose';

export interface IItem extends Document {
  owner: Types.ObjectId;
  title: string;
  author: string;
  notes?: string;
  link?: string;
  read: boolean;
  in_folder: Types.ObjectId | null;
  created_at: Date;
  last_modified: Date;
}
