import mongoose, { Schema } from "mongoose";

const collaborationSchema = new mongoose.Schema({
  names: {
    type: String,
    required: [true, " Name is required"],
    trim: true,
    maxlength: [50, "Title cannot exceed 50 characters"],
  },
  image: {
    type: String,
    required: [true, "Image is required"],
    trim: true,
  },
});

const Collaboration = mongoose.model("Collaboration", collaborationSchema);
export default Collaboration;
