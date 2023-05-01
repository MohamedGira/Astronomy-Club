import mongoose from "mongoose";
import { AppError } from "../../../utils/AppError.mjs";

const committeeSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Committee", committeeSchema);
