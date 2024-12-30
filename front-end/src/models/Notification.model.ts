import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  message: string;
  // Add other notification properties here
}

export const NotificationSchema: Schema = new Schema({
  message: { type: String, required: true },
  // Define other notification properties here
});

const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;