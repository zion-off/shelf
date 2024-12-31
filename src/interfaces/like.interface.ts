import { Document, Types } from 'mongoose';

export interface ILike extends Document {
  _id: Types.ObjectId;
  owner: Types.ObjectId;
  post: Types.ObjectId;
  created_at: Date;
}
