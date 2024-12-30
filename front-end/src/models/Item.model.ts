import mongoose, { Schema, Document } from "mongoose";

interface IItem extends Document {
  title: string;
  author: string;
  link: string;
  read: boolean;
  public: boolean;
  date_added: Date;
  notes: string;
  thumbnail: string;
}

const itemSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: false },
  link: { type: String, required: false },
  read: { type: Boolean, default: false },
  public: { type: Boolean, default: true },
  date_added: { type: Date, default: Date.now },
  notes: { type: String, default: "" },
  thumbnail: { type: String, required: true },
});

const Item = mongoose.model<IItem>("Item", itemSchema);

export default Item;
