import mongoose, { Schema, Document } from "mongoose";

export interface IFolder extends Document {
  name: string;
  // Add other folder properties here
}

export const FolderSchema: Schema = new Schema({
  name: { type: String, required: true },
  // Define other folder properties here
});

const Folder = mongoose.model<IFolder>("Folder", FolderSchema);

export default Folder;
