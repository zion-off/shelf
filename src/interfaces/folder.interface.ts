import { Document, Types } from 'mongoose';

export interface IFolder extends Document {
  owner: Types.ObjectId;
  name: string;
  public: boolean;
  created_at: Date;
  last_modified: Date;
}
