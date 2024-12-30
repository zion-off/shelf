import mongoose from "mongoose";
import { INotification } from "../interfaces/notification.interface";

const notificationSchema = new mongoose.Schema<INotification>({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  actor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  created_at: { type: Date, default: Date.now },
  type: { type: String, required: true },
  is_read: { type: Boolean, default: false },
});

// Index on recipient and created_at
notificationSchema.index({ recipient: 1, created_at: -1 });

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema
);

export default Notification;
