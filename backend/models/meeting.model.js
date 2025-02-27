import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    frequency: {
      type: String,
      required: true,
      enum: ["Weekly", "Monthly"],
    },
    day: {
      type: [String],
      default: "Tuesday",
    },
    location: {
      type: String,
      required: true,
      enum: [
        "CMP 101",
        "CMP 102",
        "CMP 103",
        "CMP 104",
        "CMP 105",
        "CMP 106",
        "CMP 107",
        "CMP 108",
      ],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

export default Meeting;
