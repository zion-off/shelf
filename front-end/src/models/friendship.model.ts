import mongoose from "mongoose";
import { IFriendship } from "../interfaces/friendship.interface";

const friendshipSchema = new mongoose.Schema<IFriendship>({
  user_one: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user_two: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

// Compound index on user_one and user_two for efficient friendship lookups
friendshipSchema.index({ user_one: 1, user_two: 1 });

const Friendship = mongoose.model<IFriendship>("Friendship", friendshipSchema);

export default Friendship;
