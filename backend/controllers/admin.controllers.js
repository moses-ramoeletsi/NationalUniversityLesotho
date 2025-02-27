import mongoose from "mongoose";
import User from "../models/user.model.js";
// import Meeting from "../models/meeting.model.js";
// import Trip from "../models/trips.model.js";
// import Seminar from "../models/seminars.js";
// import HealthCare from "../models/mental-health.model.js";
// import Debate from "../models/debate.model.js";
// import Collaboration from "../models/CollaborationAndPartnership.model.js";

//user controllers
export const createUser = async (req, res) => {
  const user = req.body;
  if (!user.firstName || !user.lastName || !user.personnelType || !user.image) {
    return res.status(400).json({
      success: false,
      message: "All field are required",
    });
  }

  const validPersonnelType = [
    "President",
    "Vice-president",
    "Chief Organizer",
    "Secretary",
    "Vice-secretary",
  ];
  if (!validPersonnelType.includes(user.personnelType)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Personnel  type",
    });
  }

  const newUser = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    personnelType: user.personnelType,
    image: user.image,
  });

  try {
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User added",
      data: newUser,
    });
  } catch (error) {
    console.error("Error in adding new user", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log("Error in getting user", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid user Id" });
  }

  if (user.personnelType) {
    const validPersonnelType = [
      "President",
      "Vice-president",
      "Chief Organizer",
      "Secretary",
      "Vice-secretary",
    ];
    if (!validPersonnelType.includes(user.personnelType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user type",
      });
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "User updated",
      data: updatedUser,
    });
  } catch (error) {
    console.log("Error in updating user", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid user Id" });
  }
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.log("Error in deleting user", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};