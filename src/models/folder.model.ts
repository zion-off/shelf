import mongoose from 'mongoose';
import { IFolder } from '../interfaces/folder.interface';

const folderSchema = new mongoose.Schema<IFolder>({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  public: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  last_modified: { type: Date, default: Date.now }
});

// Index on owner
folderSchema.index({ owner: 1 });

const Folder = mongoose.models.Folder || mongoose.model<IFolder>("Folder", folderSchema);

export default Folder;
