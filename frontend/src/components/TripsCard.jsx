import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Bus,
  X,
  CheckCircle,
  Edit,
  Trash2,
} from "lucide-react";
import { tripStore } from "../store/trips.store.js";

const TripCard = ({ trip }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const { updateTrip, deleteTrip } = tripStore();
  const [isUpdateTripModal, setIsUpdatedTripModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(trip);

  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
  };

  const handleUpdateTrip = () => {
    setIsUpdatedTripModalOpen(true);
  };

  const handleSaveUpdatedTrip = async (tripId, updatedTrip) => {
    const { success, message } = await updateTrip(tripId, updatedTrip);
    if (success) {
      console.log(message || "Trip Updated");
    } else {
      console.log(message || "Error");
    }
    setIsUpdatedTripModalOpen(false);
  };

  const handleDeleteTrip = async (tripId) => {
    const { success, message } = await deleteTrip(tripId);
    if (success) {
      console.log(message);
    } else {
      console.log(message);
    }
  };

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
        <img
          src={trip.imageUrl}
          alt={trip.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={handleUpdateTrip}
            className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600 transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => handleDeleteTrip(trip._id)}
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-2">{trip.status}</h2>
          <h3 className="text-2xl font-semibold mb-2">{trip.title}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-5 h-5 mr-2" />
            {trip.location}
          </div>
          <div className="flex items-center text-gray-600 mb-4">
            <Calendar className="w-5 h-5 mr-2" />
            {trip.date}
          </div>
          <button
            onClick={() => handleTripSelect(trip)}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            View Details
          </button>
        </div>

        {isUpdateTripModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 w-96 relative">
              <button
                onClick={() => {
                  setIsUpdatedTripModalOpen(false);
                }}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-green-900 mb-6">
                Edit Trip
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Trip Title"
                  className="w-full px-3 py-2 border rounded-md"
                  value={editingTrip.title}
                  onChange={(e) =>
                    setEditingTrip({ ...editingTrip, title: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full px-3 py-2 border rounded-md"
                  value={editingTrip.location}
                  onChange={(e) =>
                    setEditingTrip({ ...editingTrip, location: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Meeting date"
                  className="w-full px-3 py-2 border rounded-md"
                  value={editingTrip.date}
                  onChange={(e) =>
                    setEditingTrip({ ...editingTrip, date: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="w-full px-3 py-2 border rounded-md"
                  value={editingTrip.description}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      description: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Highlights"
                  className="w-full px-3 py-2 border rounded-md"
                  value={editingTrip.highlights}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      highlights: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Cost"
                  className="w-full px-3 py-2 border rounded-md"
                  value={editingTrip.cost}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      cost: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="ImageUrl"
                  className="w-full px-3 py-2 border rounded-md"
                  value={editingTrip.imageUrl}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      imageUrl: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Status"
                  className="w-full px-3 py-2 border rounded-md"
                  value={editingTrip.status}
                  onChange={(e) =>
                    setEditingTrip({
                      ...editingTrip,
                      status: e.target.value,
                    })
                  }
                />

                <button
                  onClick={() => handleSaveUpdatedTrip(trip._id, editingTrip)}
                  className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-800"
                >
                  Update Trip
                  {/* {editingMember ? "Update Meeting" : "Save Meeting"} */}
                </button>
              </div>
            </div>
          </div>
        )}
        {selectedTrip && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold">Title</h2>
                  <button
                    onClick={() => setSelectedTrip(null)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <X size={24} />
                  </button>
                </div>
                <img
                  src={selectedTrip.imageUrl}
                  alt={selectedTrip.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Trip Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-green-600" />
                        <span>{selectedTrip.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-green-600" />
                        <span>{selectedTrip.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Bus className="w-5 h-5 mr-2 text-purple-600" />
                        <span>Cost: {selectedTrip.cost}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-4">
                      Trip Highlights
                    </h3>
                    <ul className="space-y-2">
                      {selectedTrip.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <p className="mt-6 text-gray-700">{selectedTrip.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TripCard;
