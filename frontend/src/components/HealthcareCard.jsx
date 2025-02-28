import React, { useState } from "react";
import { Edit, X, Trash2 } from "lucide-react";
import { healthCareStore } from "../store/healthcare.store.js";
const HealthCareCard = ({ healthCare }) => {
  const { updateHealthCare, deleteHealthCare } = healthCareStore();
  const [isUpdateHealthCareModal, setIsUpdatedHealthCareModalOpen] =
    useState(false);
  const [editingHealthCare, setEditingHealthCare] = useState(healthCare);

  const handleUpdateHealthCare = () => {
    setIsUpdatedHealthCareModalOpen(true);
  };

  const handleSaveUpdatedHealthCare = async (
    healthCareId,
    updatedHealthCare
  ) => {
    const { success, message } = await updateHealthCare(
      healthCareId,
      updatedHealthCare
    );
    if (success) {
      console.log(message || "HealthCare Updated");
    } else {
      console.log(message || "Error");
    }
    setIsUpdatedHealthCareModalOpen(false);
  };

  const handleDeleteHealthCare = async (HealthCareId) => {
    const { success, message } = await deleteHealthCare(HealthCareId);
    if (success) {
      console.log(message);
    } else {
      console.log(message);
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
      <div className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl p-4 space-y-4">
      <h3 className="text-lg font-bold text-gray-800">{healthCare.title}</h3>
      <p className="text-gray-600">{healthCare.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{healthCare.date}</span>
        <span className="text-sm text-gray-500">{healthCare.location}</span>
      </div>
    </div>
      <div className="absolute top-2 right-2 flex space-x-2">
        <button
          onClick={handleUpdateHealthCare}
          className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => handleDeleteHealthCare(healthCare._id)}
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {isUpdateHealthCareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-96 relative">
            <button
              onClick={() => {
                setIsUpdatedHealthCareModalOpen(false);
              }}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-green-900 mb-6">
              Edit HealthCare
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="HealthCare Title"
                className="w-full px-3 py-2 border rounded-md"
                value={editingHealthCare.title}
                onChange={(e) =>
                  setEditingHealthCare({
                    ...editingHealthCare,
                    title: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="w-full px-3 py-2 border rounded-md"
                value={editingHealthCare.description}
                onChange={(e) =>
                  setEditingHealthCare({
                    ...editingHealthCare,
                    description: e.target.value,
                  })
                }
              />

              <input
                type="text"
                placeholder="Date"
                className="w-full px-3 py-2 border rounded-md"
                value={editingHealthCare.date}
                onChange={(e) =>
                  setEditingHealthCare({
                    ...editingHealthCare,
                    date: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full px-3 py-2 border rounded-md"
                value={editingHealthCare.location}
                onChange={(e) =>
                  setEditingHealthCare({
                    ...editingHealthCare,
                    location: e.target.value,
                  })
                }
              />

              <button
                onClick={() =>
                  handleSaveUpdatedHealthCare(healthCare._id, editingHealthCare)
                }
                className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-800"
              >
                Update HealthCare
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthCareCard;
