import React, {useState, useEffect} from 'react'
import {  Plus, X } from "lucide-react";
import MeetingCard from '../components/MeetingCard';
import { meetingStore } from '../store/meeting.store';

const Meetings = () => {
    
  const [isAddMeetingModalOpen, setIsAddMeetingModalOpen] = useState(false);
  const { fetchMeeting, meetingItem, createNewMeeting } = meetingStore();

  const [newMeeting, setMeeting] = useState({
    frequency: "",
    day: [],
    location: "",
    description: "",
  });

  const meetingCadence = ["Weekly", "Monthly"];
  const meetingLocation = [
    "CMP 101",
    "CMP 102",
    "CMP 103",
    "CMP 104",
    "CMP 105",
    "CMP 106",
    "CMP 107",
    "CMP 108",
  ];
  
  const daysOfWeek = [
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday", 
    "Sunday"
  ];

  useEffect(() => {
    fetchMeeting();
  }, [fetchMeeting]);
 
  const handleAddMeeting = () => {
    setIsAddMeetingModalOpen(true);
  };

  const handleDayChange = (day) => {
    if (newMeeting.day.includes(day)) {
      setMeeting({
        ...newMeeting,
        day: newMeeting.day.filter(d => d !== day)
      });
    } else {
      setMeeting({
        ...newMeeting,
        day: [...newMeeting.day, day]
      });
    }
  };

  const handleSaveNewMeeting = async () => {
    try {
      if (
        !newMeeting.frequency ||
        newMeeting.day.length === 0 ||
        !newMeeting.location ||
        !newMeeting.description
      ) {
        console.log("Please fill in all fields");
        return;
      }
      
      const meetingToSave = {
        ...newMeeting,
        day: newMeeting.day.join(", ")
      };
      
      const { success, message } = await createNewMeeting(meetingToSave);

      if (success) {
        console.log(message || "New meeting added");
        setMeeting({
          frequency: "",
          day: [],
          location: "",
          description: "",
        });
        setIsAddMeetingModalOpen(false);
        // Refresh the meetings list
        fetchMeeting();
      } else {
        console.log(message || "Failed to add new meeting");
      }
    } catch (error) {
      console.log("An unexpected error");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-900">
          Manage Meetings
        </h2>
        <button
          onClick={handleAddMeeting}
          className="flex items-center px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-800"
        >
          <Plus className="mr-2" size={20} />
          Add Meeting
        </button>
      </div>
      <div>
        {meetingItem && meetingItem.length > 0 ? (
          meetingItem.map((meeting) => (
            <MeetingCard key={meeting._id} meeting={meeting} />
          ))
        ) : (
          <p>No meetings found</p>
        )}
      </div>
      {isAddMeetingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-96 relative">
            <button
              onClick={() => {
                setIsAddMeetingModalOpen(false);
                setMeeting({
                  frequency: "",
                  day: [],
                  location: "",
                  description: "",
                });
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-green-900 mb-6">
              Add New Meeting
            </h2>

            <div className="space-y-4">
              {/* Meeting Cadence Radio Buttons */}
              <div className="space-y-2">
                <p className="text-sm text-gray-700 font-medium">Meeting Cadence:</p>
                <div className="grid grid-cols-2 gap-2">
                  {meetingCadence.map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        type="radio"
                        id={type}
                        name="frequency"
                        value={type}
                        checked={newMeeting.frequency === type}
                        onChange={() =>
                            setMeeting({ ...newMeeting, frequency: type })
                        }
                        className="mr-2"
                      />
                      <label htmlFor={type} className="text-sm">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Days Checkboxes */}
              <div className="space-y-2">
                <p className="text-sm text-gray-700 font-medium">Meeting Days:</p>
                <div className="grid grid-cols-2 gap-2">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        id={day}
                        checked={newMeeting.day.includes(day)}
                        onChange={() => handleDayChange(day)}
                        className="mr-2"
                      />
                      <label htmlFor={day} className="text-sm">
                        {day}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Location Dropdown */}
              <div className="space-y-2">
                <p className="text-sm text-gray-700 font-medium">Location:</p>
                <select
                  className="w-full px-3 py-2 border rounded-md bg-white"
                  value={newMeeting.location}
                  onChange={(e) =>
                    setMeeting({ ...newMeeting, location: e.target.value })
                  }
                >
                  <option value="">Select a location</option>
                  {meetingLocation.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
              
              <input
                type="text"
                placeholder="Description"
                className="w-full px-3 py-2 border rounded-md"
                value={newMeeting.description}
                onChange={(e) =>
                  setMeeting({
                    ...newMeeting,
                    description: e.target.value,
                  })
                }
              />

              <button
                onClick={handleSaveNewMeeting}
                className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-800"
              >
               Save Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Meetings