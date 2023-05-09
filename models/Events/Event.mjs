import mongoose from "mongoose";
import { LocationSchema } from "./subSchemas/Location.mjs";
import { Checkpoint, CheckpointSchema } from "./subSchemas/checkpoint.mjs";
import { GatheringPointSchema } from "./subSchemas/gatheringPoint.mjs";
import { eventTypeSchema } from "./eventType.mjs";

export const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  type: {
    type: eventTypeSchema,
  },
  description: {
    type: String,
    required: true,
  },
  banner: String,
  images: [String],
  capacity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isVisible: Boolean,
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: LocationSchema,
    required: true,
  },
  gatheringPoints: [GatheringPointSchema],
});

EventSchema.pre(/delete/i, async function (next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc) {
    const deleted = await Checkpoint.find({ event: doc._id });
    for (let elem in deleted) {
      await Checkpoint.findByIdAndDelete(deleted[elem]._id);
    }
    if (deleted) console.log(`deleted ${deleted.length} checkpoints from db`);
  }
  next();
});
export const Event = mongoose.model("Event", EventSchema);
