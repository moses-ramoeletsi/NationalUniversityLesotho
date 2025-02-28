import mongoose from "mongoose";
import Trip from "../models/educational-trips.model"

export const createTrip = async (req, res) => {
    const trip = req.body;
  
    const requiredFields = [
      "title",
      "location",
      "date",
      "description",
      "highlights",
      "cost",
      "imageUrl",
    ];
    const missingFields = requiredFields.filter((field) => !trip[field]);
  
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }
  
    const newTrip = new Trip({
      title: trip.title,
      location: trip.location,
      date: trip.date,
      description: trip.description,
      highlights: trip.highlights,
      cost: trip.cost,
      imageUrl: trip.imageUrl,
      status: trip.status || "Upcoming",
    });
  
    try {
      await newTrip.save();
      res.status(201).json({
        success: true,
        message: "Trip added successfully",
        data: newTrip,
      });
    } catch (error) {
      console.error("Error in adding new trip", error);
      return res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  };
  export const getTrips = async (req, res) => {
    try {
      const trip = await Trip.find({});
      res.status(200).json({ success: true, data: trip });
    } catch (error) {
      console.log("Error in getting trip", error.message);
      res.status(400).json({ success: false, message: "Server Error" });
    }
  };
  
  export const updateTrip = async (req, res) => {
    const { id } = req.params;
    const trip = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid Trip ID",
      });
    }
  
    const validStatus = ["Upcoming", "In Progress", "Completed", "Cancelled"];
    if (trip.status && !validStatus.includes(trip.status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Trip Status",
      });
    }
  
    try {
      const existingTrip = await Trip.findById(id);
  
      if (!existingTrip) {
        return res.status(404).json({
          success: false,
          message: "Trip not found",
        });
      }
  
      const updatedTrip = await Trip.findByIdAndUpdate(id, trip, {
        new: true,
        runValidators: true,
      });
  
      res.status(200).json({
        success: true,
        message: "Trip Updated Successfully",
        data: updatedTrip,
      });
    } catch (error) {
      console.error("Error in updating trip", error.message);
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  };
  
  export const deleteTrip = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid trip Id" });
    }
    try {
      await Trip.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Trip deleted" });
    } catch (error) {
      console.log("Error in deleting trip", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };