import React, { useState } from "react";
import { Edit, X, Trash2,Tag, Calendar,Clock, MapPin } from "lucide-react";
import { seminarStore } from "../store/seminars.store.js";

const SeminarsCard = ({ seminar }) => {
  const { updateSeminar, deleteSeminar } = seminarStore();
  const [isUpdateSeminarModal, setIsUpdatedSeminarModalOpen] = useState(false);
  const [editingSeminar, setEditingSeminar] = useState(seminar);

  const handleUpdateSeminar = () => {
    setIsUpdatedSeminarModalOpen(true);
  };

  const handleSaveUpdatedSeminar = async (seminarId, updatedSeminar) => {
    const { success, message } = await updateSeminar(seminarId, updatedSeminar);
    if (success) {
      console.log(message || "Seminar Updated");
    } else {
      console.log(message || "Error");
    }
    setIsUpdatedSeminarModalOpen(false);
  };

  const handleDeleteSeminar = async (seminarId) => {
    const { success, message } = await deleteSeminar(seminarId);
    if (success) {
      console.log(message);
    } else {
      console.log(message);
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
      <div className="p-6 relative">

      <div className="relative top-0 right-2">
          <span className={`
            px-3 py-1 rounded-full text-xs font-semibold
            ${seminar.type === 'Upcoming' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
          `}>
            {seminar.type}
          </span>
        </div>
        <div className="space-y-4">
          {/* Seminar Title */}
          <h3 className="text-2xl font-bold text-green-900 mb-2">
            {seminar.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-4 line-clamp-3">
            {seminar.description}
          </p>

          {/* Seminar Details */}
          <div className="space-y-3">
            <div className="flex items-center text-gray-700">
              <Calendar size={20} className="mr-3 text-green-600" />
              <span className="font-medium">{seminar.date}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Clock size={20} className="mr-3 text-green-600" />
              <span className="font-medium">{seminar.time}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <MapPin size={20} className="mr-3 text-green-600" />
              <span className="font-medium">{seminar.location}</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-green-50 p-4 rounded-lg mt-4">
            <div className="flex items-center mb-2">
              <Tag size={20} className="mr-2 text-green-600" />
              <h4 className="text-sm font-semibold text-green-900">
                Highlights
              </h4>
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">
              {seminar.highlights}
            </p>
          </div>
        </div>
        
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={handleUpdateSeminar}
          className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => handleDeleteSeminar(seminar._id)}
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      </div>

      {isUpdateSeminarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-96 relative">
            <button
              onClick={() => {
                setIsUpdatedSeminarModalOpen(false);
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-green-900 mb-6">
              Edit Seminar
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Seminar Title"
                className="w-full px-3 py-2 border rounded-md"
                value={editingSeminar.title}
                onChange={(e) =>
                  setEditingSeminar({
                    ...editingSeminar,
                    title: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="w-full px-3 py-2 border rounded-md"
                value={editingSeminar.description}
                onChange={(e) =>
                  setEditingSeminar({
                    ...editingSeminar,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Date"
                className="w-full px-3 py-2 border rounded-md"
                value={editingSeminar.date}
                onChange={(e) =>
                  setEditingSeminar({ ...editingSeminar, date: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Time"
                className="w-full px-3 py-2 border rounded-md"
                value={editingSeminar.time}
                onChange={(e) =>
                  setEditingSeminar({
                    ...editingSeminar,
                    time: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full px-3 py-2 border rounded-md"
                value={editingSeminar.location}
                onChange={(e) =>
                  setEditingSeminar({
                    ...editingSeminar,
                    location: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Highlights"
                className="w-full px-3 py-2 border rounded-md"
                value={editingSeminar.highlights}
                onChange={(e) =>
                  setEditingSeminar({
                    ...editingSeminar,
                    highlights: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Status"
                className="w-full px-3 py-2 border rounded-md"
                value={editingSeminar.type}
                onChange={(e) =>
                  setEditingSeminar({
                    ...editingSeminar,
                    type: e.target.value,
                  })
                }
              />

              <button
                onClick={() =>
                  handleSaveUpdatedSeminar(seminar._id, editingSeminar)
                }
                className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-800"
              >
                Update Seminar
                {/* {editingMember ? "Update Meeting" : "Save Meeting"} */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeminarsCard;
