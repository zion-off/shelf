import mongoose from "mongoose";
import { IItem } from "../interfaces/models/item.interface";

const itemSchema = new mongoose.Schema<IItem>({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  notes: { type: String },
  link: { type: String },
  thumbnail: { type: String },
  placeholderCover: { type: String },
  read: { type: Boolean, default: false },
  in_folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
  },
  created_at: { type: Date, default: Date.now },
  last_modified: { type: Date, default: Date.now },
});

// Composite index on owner and in_folder
itemSchema.index({ owner: 1, in_folder: 1 });

const Item = mongoose.models.Item || mongoose.model<IItem>("Item", itemSchema);

export default Item;
