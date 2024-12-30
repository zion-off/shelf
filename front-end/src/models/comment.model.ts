import mongoose from "mongoose";
import { IComment } from "../interfaces/comment.interface";

const commentSchema = new mongoose.Schema<IComment>({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  content: { type: String, required: true },
});

// Index on post
commentSchema.index({ post: 1 });

const Comment = mongoose.models.Comment || mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
