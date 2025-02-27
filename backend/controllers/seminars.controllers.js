import mongoose from "mongoose"
import Seminar from "../models/seminars.js";

export const createSeminar = async (req, res) => {
    const seminar = req.body;
  
    const requiredFields = [
      "title",
      "description",
      "date",
      "time",
      "location",
      "highlights",
    ];
    const missingFields = requiredFields.filter((field) => !seminar[field]);
  
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }
  
    const newSeminar = new Seminar({
      title: seminar.title,
      description: seminar.description,
      date: seminar.date,
      time: seminar.time,
      location: seminar.location,
      type: seminar.type,
      highlights: seminar.highlights,
      status: seminar.status || "Upcoming",
    });
  
    try {
      await newSeminar.save();
      res.status(201).json({
        success: true,
        message: "Seminar added successfully",
        data: newSeminar,
      });
    } catch (error) {
      console.error("Error in adding new seminar", error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  };
  
  export const getSeminars = async (req, res) => {
    try {
      const seminar = await Seminar.find({});
      res.status(200).json({ success: true, data: seminar });
    } catch (error) {
      console.log("Error in getting Seminar", error.message);
      res.status(400).json({ success: false, message: "Server Error" });
    }
  };
  
  export const updateSeminar = async (req, res) => {
    const { id } = req.params;
    const seminar = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid Seminar ID",
      });
    }
  
    const validStatus = ["Upcoming", "past"];
    if (seminar.type && !validStatus.includes(seminar.type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Seminar Status",
      });
    }
  
    try {
      const existingSeminar = await Seminar.findById(id);
  
      if (!existingSeminar) {
        return res.status(404).json({
          success: false,
          message: "Seminar not found",
        });
      }
  
      const updatedSeminar = await Seminar.findByIdAndUpdate(id, seminar, {
        new: true,
        runValidators: true,
      });
  
      res.status(200).json({
        success: true,
        message: "Seminar Updated Successfully",
        data: updatedSeminar,
      });
    } catch (error) {
      console.error("Error in updating Seminar", error.message);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };
  export const deleteSeminar = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Seminar Id" });
    }
    try {
      await Seminar.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Seminar deleted" });
    } catch (error) {
      console.log("Error in deleting Seminar", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  