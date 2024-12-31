import { Document, Types } from 'mongoose';

export interface IFriendRequest extends Document {
  _id: Types.ObjectId;
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
}
