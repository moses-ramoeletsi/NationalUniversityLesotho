import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { debateStore } from "../store/debate.store.js";
import DebatesCard from "./DebateCard.jsx";

const AddDebate = () => {
  const { fetchDebates, debates } = debateStore();
  const [isUpdateDebateModal, setIsUpdatedDebateModalOpen] = useState();
  const { createDebate } = debateStore();

  const EVENT_TYPES = ["Academic", "Inter-university", "Internal", "Public"];
  const [newDebate, setNewDebate] = useState({
    title: "",
    topic: "",
    description: "",
    date: "",
    location: "",
    participants: "",
    status: "Upcoming",
    eventType: "Academic",
  });
  const handleAddDebate = () => {
    setIsUpdatedDebateModalOpen(true);
  };

  const handleSaveNewDebate = async () => {
    try {
      if (
        !newDebate.title ||
        !newDebate.topic ||
        !newDebate.description ||
        !newDebate.date ||
        !newDebate.location ||
        !newDebate.participants
      ) {
        console.log("Please fill in all fields");
        return;
      }
      const { success, message } = await createDebate(newDebate);

      if (success) {
        console.log(message || "New Debate added");
        setNewDebate({
          title: "",
          topic: "",
          description: "",
          date: "",
          location: "",
          participants: "",
          status: "Upcoming",
          eventType: "Academic",
        });
        setIsUpdatedDebateModalOpen(false);
      } else {
        console.log(message || "failed to add new Debate");
      }
    } catch (error) {
      console.log("An unexpected error");
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDebates();
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-900">Manage Debate</h2>
        <button
          onClick={handleAddDebate}
          className="flex items-center px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-800"
        >
          <Plus className="mr-2" size={20} />
          Add Debate
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {debates.map((debate) => (
          <DebatesCard key={debate._id} debate={debate} />
        ))}
      </div>
      {isUpdateDebateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-96 relative">
            <button
              onClick={() => {
                setIsUpdatedDebateModalOpen(false);
                //   setEditingMember(null);
                //   setNewDebate({
                //     frequency: "",
                //     date: "",
                //     location: "",
                //     description: "",
                //   });
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-green-900 mb-6">
              Add New Debate
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Debate Title"
                className="w-full px-3 py-2 border rounded-md"
                value={newDebate.title}
                onChange={(e) =>
                  setNewDebate({ ...newDebate, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Debate Topic"
                className="w-full px-3 py-2 border rounded-md"
                value={newDebate.topic}
                onChange={(e) =>
                  setNewDebate({ ...newDebate, topic: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="w-full px-3 py-2 border rounded-md"
                value={newDebate.description}
                onChange={(e) =>
                  setNewDebate({
                    ...newDebate,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Date"
                className="w-full px-3 py-2 border rounded-md"
                value={newDebate.date}
                onChange={(e) =>
                  setNewDebate({ ...newDebate, date: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full px-3 py-2 border rounded-md"
                value={newDebate.location}
                onChange={(e) =>
                  setNewDebate({ ...newDebate, location: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Participants"
                className="w-full px-3 py-2 border rounded-md"
                value={newDebate.participants}
                onChange={(e) =>
                  setNewDebate({ ...newDebate, participants: e.target.value })
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
                        checked={newDebate.eventType === type}
                        onChange={() =>
                          setNewDebate({
                            ...newDebate,
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
                onClick={handleSaveNewDebate}
                className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-800"
              >
                Add Debate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDebate;
