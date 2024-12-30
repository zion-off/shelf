import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  created_at: Date;
}
