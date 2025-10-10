import mongoose from 'mongoose';
import { IApiKey } from '../interfaces/models/apiKey.interface';

const apiKeySchema = new mongoose.Schema<IApiKey>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  keyHash: { type: String, required: true },
  name: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastUsedAt: { type: Date },
  isActive: { type: Boolean, default: true }
});

// Index for faster lookups
apiKeySchema.index({ user: 1, isActive: 1 });

const ApiKey = mongoose.models.ApiKey || mongoose.model<IApiKey>('ApiKey', apiKeySchema);

export default ApiKey;
