import mongoose from "mongoose";
import { IUser } from "../interfaces/models/user.interface";

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // email is automatically indexed
  username: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
