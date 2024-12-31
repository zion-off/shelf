import { Document, Types } from "mongoose";

export interface IConfig extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  default_folder: Types.ObjectId | null;
}
