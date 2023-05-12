import mongoose from "mongoose";
import { AppError } from "../../../utils/AppError.mjs";

export const committeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },

  /*  president: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      role: { type: mongoose.Schema.Types.ObjectId, ref: 'committeeRole' },
    },
  ],
*/
});

export const committee = mongoose.model("committee", committeeSchema);
