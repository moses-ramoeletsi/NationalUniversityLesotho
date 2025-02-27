import mongoose, { Schema, model } from "mongoose";

const SeminarSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Upcoming", "past"],
      default: "Upcoming",
    },
    highlights: {
      type: [String],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Seminar = mongoose.model("Seminar", SeminarSchema);

export default Seminar;
