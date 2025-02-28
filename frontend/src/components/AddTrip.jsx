import { Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import TripCard from "./TripsCard";
import { tripStore } from "../store/trips.store";

const AddTrip = () => {
  const [isTripModalOpen, setIsTripModalOpen] = useState();
  const { fetchTrips, trips } = tripStore();
  const { createTrip } = tripStore();

  const [newTrip, setNewTrip] = useState({
    title: "",
    location: "",
    date: "",
    description: "",
    highlights: "",
    cost: "",
    imageUrl: "",
    status: "Upcoming",
  });
  useEffect(() => {
    fetchTrips();
  }, []);

  const handleAddTrip = () => {
    setIsTripModalOpen(true);
  };

  const handleSaveNewTrip = async () => {
    try {
      if (
        !newTrip.title ||
        !newTrip.location ||
        !newTrip.date ||
        !newTrip.description ||
        !newTrip.highlights ||
        !newTrip.cost ||
        !newTrip.imageUrl
      ) {
        console.log("Please fill in all fields");
        return;
      }
      const { success, message } = await createTrip(newTrip);

      if (success) {
        console.log(message || "New Trip added");
        setNewTrip({
          title: "",
          location: "",
          date: "",
          description: "",
          highlights: "",
          cost: "",
          imageUrl: "",
          status: "Upcoming",
        });
        setIsTripModalOpen(false);
      } else {
        console.log(message || "failed to add new trip");
      }
    } catch (error) {
      console.log("An unexpected error");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-900">Manage Trips</h2>
        <button
          onClick={handleAddTrip}
          className="flex items-center px-4 py-2 bg-green-900 text-white rounded-md hover:bg-green-800"
        >
          <Plus className="mr-2" size={20} />
          Add Trip
        </button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
      {isTripModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-96 relative">
            <button
              onClick={() => {
                setIsTripModalOpen(false);
                //   setEditingMember(null);
                //   setNewTrip({
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
              Add New Trip
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Trip Title"
                className="w-full px-3 py-2 border rounded-md"
                value={newTrip.title}
                onChange={(e) =>
                  setNewTrip({ ...newTrip, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Location"
                className="w-full px-3 py-2 border rounded-md"
                value={newTrip.location}
                onChange={(e) =>
                  setNewTrip({ ...newTrip, location: e.target.value })
                }
              />
              <input
                type="text"
                placeholder=" Date"
                className="w-full px-3 py-2 border rounded-md"
                value={newTrip.date}
                onChange={(e) =>
                  setNewTrip({ ...newTrip, date: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="w-full px-3 py-2 border rounded-md"
                value={newTrip.description}
                onChange={(e) =>
                  setNewTrip({
                    ...newTrip,
                    description: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Highlights"
                className="w-full px-3 py-2 border rounded-md"
                value={newTrip.highlights}
                onChange={(e) =>
                  setNewTrip({
                    ...newTrip,
                    highlights: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Cost"
                className="w-full px-3 py-2 border rounded-md"
                value={newTrip.cost}
                onChange={(e) =>
                  setNewTrip({
                    ...newTrip,
                    cost: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="ImageUrl"
                className="w-full px-3 py-2 border rounded-md"
                value={newTrip.imageUrl}
                onChange={(e) =>
                  setNewTrip({
                    ...newTrip,
                    imageUrl: e.target.value,
                  })
                }
              />

              <button
                onClick={handleSaveNewTrip}
                className="w-full bg-green-900 text-white py-2 rounded-md hover:bg-green-800"
              >
                Save Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTrip;
