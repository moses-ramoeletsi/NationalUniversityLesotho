import mongoose from "mongoose";
import Debate from "../models/debate.model.js";
export const createDebate = async (req, res) => {
    const debate = req.body;
  
    const requiredFields = [
      "title",
      "topic",
      "description",
      "date",
      "location",
      "participants",
    ];
    const missingFields = requiredFields.filter((field) => !debate[field]);
  
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }
  
    const newDebate = new Debate({
      title: debate.title,
      topic: debate.topic,
      description: debate.description,
      date: debate.date,
      location: debate.location,
      participants: debate.participants,
      status: debate.status || "Upcoming",
      eventType: debate.eventType || "Academic",
    });
  
    try {
      await newDebate.save();
      res.status(201).json({
        success: true,
        message: "Debate added successfully",
        data: newDebate,
      });
    } catch (error) {
      console.error("Error in adding new health care", error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  };
  
  export const getDebate = async (req, res) => {
    try {
      const debate = await Debate.find({});
      res.status(200).json({ success: true, data: debate });
    } catch (error) {
      console.log("Error in getting Debate", error.message);
      res.status(400).json({ success: false, message: "Server Error" });
    }
  };
  
  export const updateDebate = async (req, res) => {
    const { id } = req.params;
    const debate = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid Debate ID",
      });
    }
  
    try {
      const existingDebate = await Debate.findById(id);
  
      if (!existingDebate) {
        return res.status(404).json({
          success: false,
          message: "Debate Care not found",
        });
      }
  
      const updatedDebate = await Debate.findByIdAndUpdate(id, debate, {
        new: true,
        runValidators: true,
      });
  
      res.status(200).json({
        success: true,
        message: "Debate Updated Successfully",
        data: updatedDebate,
      });
    } catch (error) {
      console.error("Error in updating Debate", error.message);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };
  export const deleteDebate = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid debate Id" });
    }
    try {
      await Debate.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Debate deleted" });
    } catch (error) {
      console.log("Error in deleting debate", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };