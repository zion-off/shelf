import mongoose from "mongoose";
import { IPost } from "../interfaces/post.interface";

const postSchema = new mongoose.Schema<IPost>({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  attachments: { type: String },
  like_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  last_modified: { type: Date, default: Date.now },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

// Index on owner
postSchema.index({ owner: 1 });

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", postSchema);

export default Post;
