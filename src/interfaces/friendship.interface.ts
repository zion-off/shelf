import { Document, Types } from 'mongoose';

export interface IFriendship extends Document {
  _id: Types.ObjectId;
  user_one: Types.ObjectId;
  user_two: Types.ObjectId;
}
