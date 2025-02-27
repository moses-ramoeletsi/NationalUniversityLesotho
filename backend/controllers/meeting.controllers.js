import mongoose  from 'mongoose';
import Meeting from '../models/meeting.model.js';

export const createMeeting = async (req, res) => {
    const meeting = req.body;
    if (
      !meeting.frequency ||
      !meeting.day ||
      !meeting.location ||
      !meeting.description
    ) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }
  
    const validMeetingSchedule = ["Weekly", "Monthly"];
    if (!validMeetingSchedule.includes(meeting.frequency)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Meeting schedule type",
      });
    }
  
    const validLocation = [
      "CMP 101",
      "CMP 102",
      "CMP 103",
      "CMP 104",
      "CMP 105",
      "CMP 106",
      "CMP 107",
      "CMP 108",
    ];
    if (!validLocation.includes(meeting.location)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Location  type",
      });
    }
  
    const newMeeting = new Meeting({
      frequency: meeting.frequency,
      day: meeting.day,
      location: meeting.location,
      description: meeting.description,
    });
  
    try {
      await newMeeting.save();
      res.status(201).json({
        success: true,
        message: "Meeting added",
        data: newMeeting,
      });
    } catch (error) {
      console.error("Error in adding new meeting", error.message);
      return res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  };
  export const getMeetings = async (req, res) => {
    try {
      const meeting = await Meeting.find({});
      res.status(200).json({ success: true, data: meeting });
    } catch (error) {
      console.log("Error in getting meetings", error.message);
      res.status(400).json({ success: false, message: "Server Error" });
    }
  };
  
  export const updateMeeting = async (req, res) => {
    const { id } = req.params;
    const meeting = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid Id" });
    }
  
    if (meeting.frequency) {
      const validMeetingSchedule = ["Weekly", "Monthly"];
      if (!validMeetingSchedule.includes(meeting.frequency)) {
        return res.status(400).json({
          success: false,
          message: "Invalid meeting schedule",
        });
      }
    }
  
    if (meeting.location) {
      const validLocation = [
        "CMP 101",
        "CMP 102",
        "CMP 103",
        "CMP 104",
        "CMP 105",
        "CMP 106",
        "CMP 107",
        "CMP 108",
      ];
      if (!validLocation.includes(meeting.location)) {
        return res.status(400).json({
          success: false,
          message: "Invalid meeting location",
        });
      }
    }
  
    try {
      const updatedMeeting = await Meeting.findByIdAndUpdate(id, meeting, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        success: true,
        message: "Meeting Updated",
        data: updatedMeeting,
      });
    } catch (error) {
      console.log("Error in updating meeting", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  
  export const deleteMeeting = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid meeting Id" });
    }
    try {
      await Meeting.findByIdAndDelete(id);
      res.status(200).json({ success: true, message: "Meeting deleted" });
    } catch (error) {
      console.log("Error in deleting meeting", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };