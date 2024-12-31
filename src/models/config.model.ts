import mongoose from "mongoose";
import { IConfig } from "@/interfaces/config.interface";

const configSchema = new mongoose.Schema<IConfig>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  default_folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null },
});

const Config =
  mongoose.models.Config || mongoose.model<IConfig>("Config", configSchema);

export default Config;
