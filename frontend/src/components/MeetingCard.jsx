import React, { useState } from "react";
import { MapPin, Clock, Edit, Trash, X } from "lucide-react";
import { meetingStore } from "../store/meeting.store";

const MeetingCard = ({ meeting }) => {
  const [isUpdateMeetingModal, setIsUpdatedMeetingModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(meeting);
  const { updateMeeting, deleteMeeting } = meetingStore();

  const handleUpdateMeeting = () => {
    setIsUpdatedMeetingModalOpen(true);
  };

  const handleSaveUpdatedMeeting = async (uid, updatedMeeting) => {
    const { success, message } = await updateMeeting(uid, updatedMeeting);
    if (success) {
      console.log(message || "Meeting Updated");
    } else {
      console.log(message || "Error");
    }
    setIsUpdatedMeetingModalOpen(false);
  };

  const handleDeleteMeeting = async (meetingId) => {
    const { success, message } = await deleteMeeting(meetingId);
    if (success) {
      console.log(message);
    } else {
      console.log(message);
    }
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid md:grid-cols-2 gap-6 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 space-y-6 bg-gray-50 border-r border-gray-100">
          <div className="flex items-center bg-white p-4 rounded-xl shadow-sm">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Clock className="text-green-600" size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">
                {meeting.frequency}
              </h4>
              <p className="text-gray-600 text-sm">{meeting.day}</p>
            </div>
          </div>

          <div className="flex items-center bg-white p-4 rounded-xl shadow-sm">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <MapPin className="text-green-600" size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">Location</h4>
              <p className="text-gray-600 text-sm">{meeting.location}</p>
            </div>
          </div>
        </div>

        <div className="relative p-6">
          <div className="absolute top-4 right-4 flex space-x-3">
            <button
              onClick={handleUpdateMeeting}
              className="text-green-600 hover:text-green-800 bg-green-50 p-2 rounded-full transition-all duration-200 hover:bg-green-100"
              aria-label="Edit meeting"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={() => handleDeleteMeeting(meeting._id)}
              className="text-red-600 hover:text-red-800 bg-red-50 p-2 rounded-full transition-all duration-200 hover:bg-red-100"
              aria-label="Delete meeting"
            >
              <Trash size={20} />
            </button>
          </div>

          <div className="mt-12">
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <h3 className="text-xl font-semibold text-green-900 mb-4 text-center">
                Meeting Description
              </h3>
              <p className="text-green-900 font-medium text-center leading-relaxed">
                {meeting.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      {isUpdateMeetingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-96 relative">
            <button
              onClick={() => {
                setIsUpdatedMeetingModalOpen(false);
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-green-900 mb-6">
              Edit Meeting
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Meeting Schedule"
                className="w-full px-3 py-2 border rounded-md"
                value={editingMeeting.frequency}
                onChange={(e) =>
                  setEditingMeeting({
                    ...editingMeeting,
                    frequency: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Meeting Day"
                className="w-full px-3 py-2 border rounded-md"
                value={editingMeeting.day}
                onChange={(e) =>
                  setEditingMeeting({ ...editingMeeting, day: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full px-3 py-2 border rounded-md"
                value={editingMeeting.location}
                onChange={(e) =>
                  setEditingMeeting({
                    ...editingMeeting,
                    location: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="w-full px-3 py-2 border rounded-md"
                value={editingMeeting.description}
                onChange={(e) =>
                  setEditingMeeting({
                    ...editingMeeting,
                    description: e.target.value,
                  })
                }
              />

              <button
                onClick={() =>
                  handleSaveUpdatedMeeting(meeting._id, editingMeeting)
                }
                className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-800"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingCard;
