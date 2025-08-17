import mongoose from 'mongoose';
import { IUser } from '../interfaces/models/user.interface';

const userSchema = new mongoose.Schema<IUser>({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
