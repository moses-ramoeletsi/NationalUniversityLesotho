import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import HealthCareCard from "./HealthcareCard.jsx";
import { healthCareStore } from "../store/healthcare.store.js";

const AddHealthCare = () => {
  const { fetchHealthCare, healthCare } = healthCareStore();
  const [isHealthCareModalOpen, setIsHealthCareModalOpen] = useState();
  const { createHealthCare } = healthCareStore();

  const [newHealthCare, setNewHealthCare] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
  });

  const handleAddHealthCare = () => {
    setIsHealthCareModalOpen(true);
  };

  const handleSaveNewHealthCare = async () => {
    try {
      if (
        !newHealthCare.title ||
        !newHealthCare.description ||
        !newHealthCare.date ||
        !newHealthCare.location
      ) {
        console.log("Please fill in all fields");
        return;
      }
      const { success, message } = await createHealthCare(newHealthCare);

      if (success) {
        console.log(message || "New HealthCare added");
        setNewHealthCare({
          title: "",
          description: "",
          date: "",
          location: "",
        });
        setIsHealthCareModalOpen(false);
      } else {
        console.log(message || "failed to add new HealthCare");
      }
    } catch (error) {
      console.log("An unexpected error");
      console.error(error);
    }
  };
  useEffect(() => {
    fetchHealthCare();
  }, []);
  return (
    <div className="space-y-6">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <h2 className="text-xl md:text-2xl font-bold text-green-900">Manage Health Care</h2>
      <button
        onClick={handleAddHealthCare}
        className="flex items-center px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-800"
      >
        <Plus className="mr-2" size={20} />
        Add Health Care
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {healthCare.map((healthCare) => (
        <HealthCareCard key={healthCare._id} healthCare={healthCare} />
      ))}
    </div>
    {isHealthCareModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-lg sm:w-96 w-full p-8 relative">
          <button
            onClick={() => setIsHealthCareModalOpen(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          >
            <X size={24} />
          </button>
          <h2 className="text-2xl font-bold text-green-900 mb-6">
            Add New HealthCare
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="HealthCare Title"
              className="w-full px-3 py-2 border rounded-md"
              value={newHealthCare.title}
              onChange={(e) =>
                setNewHealthCare({ ...newHealthCare, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Description"
              className="w-full px-3 py-2 border rounded-md"
              value={newHealthCare.description}
              onChange={(e) =>
                setNewHealthCare({
                  ...newHealthCare,
                  description: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Date"
              className="w-full px-3 py-2 border rounded-md"
              value={newHealthCare.date}
              onChange={(e) =>
                setNewHealthCare({ ...newHealthCare, date: e.target.value })
              }
            />

            <input
              type="text"
              placeholder="Location"
              className="w-full px-3 py-2 border rounded-md"
              value={newHealthCare.location}
              onChange={(e) =>
                setNewHealthCare({
                  ...newHealthCare,
                  location: e.target.value,
                })
              }
            />

            <button
              onClick={handleSaveNewHealthCare}
              className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-800"
            >
              Save HealthCare
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
};

export default AddHealthCare;
