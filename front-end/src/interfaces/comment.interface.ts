import { Document, Types } from 'mongoose';

export interface IComment extends Document {
  author: Types.ObjectId;
  post: Types.ObjectId;
  content: string;
}
