import { Document, Types } from 'mongoose';

export interface ILike extends Document {
  owner: Types.ObjectId;
  post: Types.ObjectId;
}
