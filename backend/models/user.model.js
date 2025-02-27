import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    personnelType: {
      type: String,
      required: true,
      enum: [
        "President",
        "Vice-president",
        "Chief Organizer",
        "Secretary",
        "Vice-secretary",
      ],
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", adminSchema);

export default User;
