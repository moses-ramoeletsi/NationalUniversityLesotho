import mongoose from "mongoose";

const TripSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Trip title is required"],
      trim: true,
      maxlength: [100, "Trip title cannot exceed 100 characters"],
    },
    location: {
      type: String,
      required: [true, "Trip location is required"],
      trim: true,
      maxlength: [150, "Location cannot exceed 150 characters"],
    },
    date: {
      type: String,
      required: [true, "Trip date is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Trip description is required"],
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    highlights: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.length >= 1 && v.length <= 5;
        },
        message: "Highlights must be between 1 and 5 items",
      },
    },

    cost: {
      type: String,
      required: [true, "Trip cost is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Upcoming", "In Progress", "Completed", "Cancelled"],
      default: "Upcoming",
    },
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", TripSchema);

export default Trip;
