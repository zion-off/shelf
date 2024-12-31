import mongoose from 'mongoose';
import { ILike } from '../interfaces/like.interface';

const likeSchema = new mongoose.Schema<ILike>({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  created_at: { type: Date, default: Date.now },
});

// Index on post and owner
likeSchema.index({ post: 1 });
likeSchema.index({ owner: 1 });

const Like = mongoose.models.Like || mongoose.model<ILike>('Like', likeSchema);

export default Like;
