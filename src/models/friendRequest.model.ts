import mongoose from "mongoose";
import { IFriendRequest } from "../interfaces/models/friendRequest.interface";

const friendRequestSchema = new mongoose.Schema<IFriendRequest>({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Index on receiver and sender
friendRequestSchema.index({ receiver: 1 });
friendRequestSchema.index({ sender: 1 });

const FriendRequest =
  mongoose.models.FriendRequest ||
  mongoose.model<IFriendRequest>("FriendRequest", friendRequestSchema);

export default FriendRequest;
