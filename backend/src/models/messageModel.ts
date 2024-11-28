import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    message: { type: String, require: true },
    timestamp: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export const Message = mongoose.model("Message", messageSchema);
