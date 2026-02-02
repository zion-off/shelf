import { Document, Types } from 'mongoose';

export interface IFolderOwner {
  _id: Types.ObjectId;
  name: string;
}

export interface IFolder extends Document {
  _id: Types.ObjectId;
  owner: Types.ObjectId | IFolderOwner;
  name: string;
  isPublic: boolean;
  created_at: Date;
  last_modified: Date;
}
