import mongoose from "mongoose";
import { AppError } from "../../../utils/AppError.mjs";

const committeeRoleSchema = new mongoose.Schema({
  Role: {
    type: String,
    enum: ["President", "Vice President", "HR", "member"],
    default: "member",
  },
});

module.exports = mongoose.model("CommitteeRole", committeeRoleSchema);
