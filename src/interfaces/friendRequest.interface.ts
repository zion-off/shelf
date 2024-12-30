import { Document, Types } from 'mongoose';

export interface IFriendRequest extends Document {
  sender: Types.ObjectId;
  receiver: Types.ObjectId;
}
