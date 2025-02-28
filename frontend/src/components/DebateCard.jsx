import React, { useState } from "react";
import { Edit, X, Trash2 } from "lucide-react";
import { debateStore } from "../store/debate.store.js";

const DebatesCard = ({ debate }) => {
  const { updateDebate, deleteDebate } = debateStore();
  const [isUpdateDebateModal, setIsUpdatedDebateModalOpen] = useState(false);
  const [editingDebate, setEditingDebate] = useState(debate);

  const handleUpdateDebate = () => {
    setIsUpdatedDebateModalOpen(true);
  };

  const handleSaveUpdatedDebate = async (debateId, updatedDebate) => {
    const { success, message } = await updateDebate(debateId, updatedDebate);
    if (success) {
      console.log(message || "Debate Updated");
    } else {
      console.log(message || "Error");
    }
    setIsUpdatedDebateModalOpen(false);
  };

  const handleDeleteDebate = async (debateId) => {
    const { success, message } = await deleteDebate(debateId);
    if (success) {
      console.log(message);
    } else {
      console.log(message);
    }
  };

  const EVENT_TYPES = ["Academic", "Inter-university", "Internal", "Public"];

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
      <h3 className="text-xl font-semibold text-green-900">{debate.title}</h3>
      <h4 className="text-xl font-semibold text-green-900">{debate.topic}</h4>
      <p className="text-gray-700 mt-2">{debate.description}</p>
      <p className="text-gray-500 mt-2">
        <strong>Date:</strong> {debate.date} <br />
        <strong>Event Type:</strong> {debate.eventType} <br />
        <strong>Location:</strong> {debate.location}
        <br />
        <strong>Status:</strong> {debate.status} <br />
      </p>
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={handleUpdateDebate}
          className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => handleDeleteDebate(debate._id)}
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {isUpdateDebateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-96 relative">
            <button
              onClick={() => {
                setIsUpdatedDebateModalOpen(false);
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-green-900 mb-6">
              Edit Debate
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Debate Title"
                className="w-full px-3 py-2 border rounded-md"
                value={editingDebate.title}
                onChange={(e) =>
                  setEditingDebate({ ...editingDebate, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Debate Topic"
                className="w-full px-3 py-2 border rounded-md"
                value={editingDebate.topic}
                onChange={(e) =>
                  setEditingDebate({ ...editingDebate, topic: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="w-full px-3 py-2 border rounded-md"
                value={editingDebate.description}
                onChange={(e) =>
                  setEditingDebate({
                    ...editingDebate,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Date"
                className="w-full px-3 py-2 border rounded-md"
                value={editingDebate.date}
                onChange={(e) =>
                  setEditingDebate({ ...editingDebate, date: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full px-3 py-2 border rounded-md"
                value={editingDebate.location}
                onChange={(e) =>
                  setEditingDebate({
                    ...editingDebate,
                    location: e.target.value,
                  })
                }
              />

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Event Type</label>
                <div className="space-y-2">
                  {EVENT_TYPES.map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        type="radio"
                        id={type}
                        name="eventType"
                        value={type}
                        checked={editingDebate.eventType === type}
                        onChange={() =>
                          setEditingDebate({
                            ...editingDebate,
                            eventType: type,
                          })
                        }
                        className="mr-2"
                      />
                      <label htmlFor={type} className="text-gray-700">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() =>
                  handleSaveUpdatedDebate(debate._id, editingDebate)
                }
                className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-800"
              >
                Update Debate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebatesCard;
