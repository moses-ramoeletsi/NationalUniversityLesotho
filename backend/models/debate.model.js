import { mongoose } from "mongoose";

const debateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Debate title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    topic: {
      type: String,
      required: [true, "Debate topic is required"],
      trim: true,
      maxlength: [300, "Topic cannot exceed 300 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    date: {
      type: Date,
      required: [true, "Debate date is required"],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [200, "Location cannot exceed 200 characters"],
    },
    participants: {
      type: [String],
      trim: true,
    },
    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Completed"],
      default: "Upcoming",
    },
    eventType: {
      type: String,
      enum: ["Academic", "Inter-university", "Internal", "Public"],
      default: "Academic",
    },
  },
  {
    timestamps: true,
  }
);

const Debate = mongoose.model("Debate", debateSchema);

export default Debate;
