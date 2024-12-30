import { Document, Types } from 'mongoose';

export interface IFriendship extends Document {
  user_one: Types.ObjectId;
  user_two: Types.ObjectId;
}
