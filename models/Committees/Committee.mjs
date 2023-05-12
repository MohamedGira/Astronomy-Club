import mongoose from "mongoose";
import { AppError } from "../../utils/AppError.mjs";

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

  president: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

});

export const Committee = mongoose.model("Committee", committeeSchema);
