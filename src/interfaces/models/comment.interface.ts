import { Document, Types } from "mongoose";

export interface IComment extends Document {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  post: Types.ObjectId;
  content: string;
  created_at: Date;
  last_modified: Date;
}
