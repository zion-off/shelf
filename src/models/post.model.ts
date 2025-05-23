import mongoose from 'mongoose';
import { IPost } from '../interfaces/models/post.interface';

const postSchema = new mongoose.Schema<IPost>({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  attachments: { type: String },
  like_count: { type: Number, default: 0 },
  comment_count: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  created_at: { type: Date, default: Date.now },
  last_modified: { type: Date, default: Date.now },
});

// Index on owner
postSchema.index({ owner: 1 });

const Post =
  mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);

export default Post;
