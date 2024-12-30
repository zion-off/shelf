import mongoose, { Schema, Document } from "mongoose";
import { IFolder, FolderSchema } from "./Folder.model";
import { INotification, NotificationSchema } from "./Notification.model";

interface IUser extends Document {
  name: string;
  email: string;
  folders: IFolder[];
  friends: IUser[];
  requests: IUser[];
  notifications: INotification[];
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  folders: { type: [FolderSchema], default: [] },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  requests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  notifications: { type: [NotificationSchema], default: [] },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
