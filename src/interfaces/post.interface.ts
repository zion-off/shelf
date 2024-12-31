import { Document, Types } from 'mongoose';

export interface IPost extends Document {
  owner: Types.ObjectId;
  content: string;
  attachments?: string;
  like_count: number;
  created_at: Date;
  last_modified: Date;
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
}
