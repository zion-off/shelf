import { Document, Types } from 'mongoose';

export interface INotification extends Document {
  _id: Types.ObjectId;
  recipient: Types.ObjectId;
  actor: Types.ObjectId;
  post: Types.ObjectId;
  created_at: Date;
  type: string;
  is_read: boolean;
}
