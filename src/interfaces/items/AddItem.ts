import mongoose from 'mongoose';

export interface AddItem {
  title: string;
  author: string;
  link?: string;
  notes?: string;
  thumbnail?: string;
}

export interface ItemData extends AddItem {
  owner: mongoose.Types.ObjectId;
  placeholderCover: string;
  in_folder: mongoose.Types.ObjectId | null;
}
