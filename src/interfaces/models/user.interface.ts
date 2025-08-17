import { Document, Types} from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  id: string;
  name: string;
  email: string;
  username: string;
  created_at: Date;
}
