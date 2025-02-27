import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { seminarStore } from "../store/seminars.store.js";
import SeminarsCard from "./SeminarsCard.jsx";

const AddSeminars = () => {
  const { fetchSeminars, seminars } = seminarStore();
  const [isSeminarModalOpen, setIsSeminarModalOpen] = useState(false);
  const { createSeminar } = seminarStore();

  const [newSeminar, setNewSeminar] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    highlights: "",
    type: "Upcoming",
  });

  useEffect(() => {
    fetchSeminars();
  }, []);

  const handleAddSeminar = () => {
    setIsSeminarModalOpen(true);
  };

  const handleSaveNewSeminar = async () => {
    try {
      if (
        !newSeminar.title ||
        !newSeminar.description ||
        !newSeminar.date ||
        !newSeminar.time ||
        !newSeminar.location ||
        !newSeminar.highlights
      ) {
        alert("Please fill in all fields");
        return;
      }
      const { success, message } = await createSeminar(newSeminar);

      if (success) {
        alert(message || "New Seminar added");
        setNewSeminar({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          highlights: "",
          type: "Upcoming",
        });
        setIsSeminarModalOpen(false);
      } else {
        alert(message || "Failed to add new Seminar");
      }
    } catch (error) {
      alert("An unexpected error occurred");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-green-900 text-center sm:text-left w-full sm:w-auto">
          Manage Seminars
        </h2>
        <button
          onClick={handleAddSeminar}
          className="flex items-center justify-center px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-800 w-full sm:w-auto"
        >
          <Plus className="mr-2" size={20} />
          Add Seminar
        </button>
      </div>

      {/* Seminars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {seminars.map((seminar) => (
          <SeminarsCard key={seminar._id} seminar={seminar} />
        ))}
      </div>

      {/* Add Seminar Modal */}
      {isSeminarModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setIsSeminarModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              <X size={24} />
            </button>

            {/* Modal Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-green-900 mb-6 text-center">
              Add New Seminar
            </h2>

            {/* Form Inputs */}
            <div className="space-y-4">
              {[
                { 
                  name: "title", 
                  placeholder: "Seminar Title",
                  type: "text"
                },
                { 
                  name: "description", 
                  placeholder: "Description",
                  type: "text"
                },
                { 
                  name: "date", 
                  placeholder: "Date",
                  type: "text"
                },
                { 
                  name: "time", 
                  placeholder: "Time",
                  type: "text"
                },
                { 
                  name: "location", 
                  placeholder: "Location",
                  type: "text"
                },
                { 
                  name: "highlights", 
                  placeholder: "Highlights",
                  type: "text"
                }
              ].map((field) => (
                <input
                  key={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={newSeminar[field.name]}
                  onChange={(e) =>
                    setNewSeminar({ 
                      ...newSeminar, 
                      [field.name]: e.target.value 
                    })
                  }
                />
              ))}

              {/* Save Button */}
              <button
                onClick={handleSaveNewSeminar}
                className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-800 transition-colors duration-300 mt-4"
              >
                Save Seminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSeminars;