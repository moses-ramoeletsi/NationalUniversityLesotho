import mongoose from "mongoose";
import Collaboration from "../models/collaborations.model.js";

export const createCollaboration = async (req, res) => {
    const collaboration = req.body;
  
    const requiredFields = ["names", "image"];
    const missingFields = requiredFields.filter((field) => !collaboration[field]);
  
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }
  
    const newCollaboration = new Collaboration({
      names: collaboration.names,
      image: collaboration.image,
    });
  
    try {
      await newCollaboration.save();
      res.status(201).json({
        success: true,
        message: "Collaborator added successfully",
        data: newCollaboration,
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
  
  export const getCollaboration = async (req, res) => {
    try {
      const collaboration = await Collaboration.find({});
      res.status(200).json({ success: true, data: collaboration });
    } catch (error) {
      console.log("Error in getting collaborator", error.message);
      res.status(400).json({ success: false, message: "Server Error" });
    }
  };
  
  export const updateCollaboration = async (req, res) => {
    const { id } = req.params;
    const collaboration = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid collaboration ID",
      });
    }
  
    try {
      const existingCollaboration = await Collaboration.findById(id);
  
      if (!existingCollaboration) {
        return res.status(404).json({
          success: false,
          message: "Collaboration Care not found",
        });
      }
  
      const updatedCollaboration = await Collaboration.findByIdAndUpdate(
        id,
        collaboration,
        {
          new: true,
          runValidators: true,
        }
      );
  
      res.status(200).json({
        success: true,
        message: "Collaboration Updated Successfully",
        data: updatedCollaboration,
      });
    } catch (error) {
      console.error("Error in updating Collaboration", error.message);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };
  export const deleteCollaboration = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid Collaboration Id" });
    }
    try {
      await Collaboration.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Collaboration deleted" });
    } catch (error) {
      console.log("Error in deleting Collaboration", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };
  