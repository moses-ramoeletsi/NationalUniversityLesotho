import mongoose from "mongoose";
import HealthCare from "../models/healthcare.model";

export const createHealthCare = async (req, res) => {
    const healthCare = req.body;
  
    const requiredFields = ["title", "description", "date", "location"];
    const missingFields = requiredFields.filter((field) => !healthCare[field]);
  
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }
  
    const newHealthCare = new HealthCare({
      title: healthCare.title,
      description: healthCare.description,
      date: healthCare.date,
      location: healthCare.location,
    });
  
    try {
      await newHealthCare.save();
      res.status(201).json({
        success: true,
        message: "HealthCare added successfully",
        data: newHealthCare,
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
  
  export const getHealthCare = async (req, res) => {
    try {
      const healthCare = await HealthCare.find({});
      res.status(200).json({ success: true, data: healthCare });
    } catch (error) {
      console.log("Error in getting HealthCare", error.message);
      res.status(400).json({ success: false, message: "Server Error" });
    }
  };
  
  export const updateHealthCare = async (req, res) => {
    const { id } = req.params;
    const healthCare = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid HealthCare ID",
      });
    }
  
    try {
      const existingHealthCare = await HealthCare.findById(id);
  
      if (!existingHealthCare) {
        return res.status(404).json({
          success: false,
          message: "Health Care not found",
        });
      }
  
      const updatedHealthCare = await HealthCare.findByIdAndUpdate(
        id,
        healthCare,
        {
          new: true,
          runValidators: true,
        }
      );
  
      res.status(200).json({
        success: true,
        message: "Health Care Updated Successfully",
        data: updatedHealthCare,
      });
    } catch (error) {
      console.error("Error in updating healthCare", error.message);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };
  export const deleteHealthCare = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid health Care Id" });
    }
    try {
      await HealthCare.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "health Care deleted" });
    } catch (error) {
      console.log("Error in deleting health Care", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };