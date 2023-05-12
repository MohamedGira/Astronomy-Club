import mongoose from "mongoose";

export const eventTypeSchema = new mongoose.Schema({
  type: {
    name: String,
    default: "trip",
  },
});
