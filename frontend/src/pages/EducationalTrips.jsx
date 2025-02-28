import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Users,
  Bus,
  X,
  BookOpen,
  Camera,
  CheckCircle,
} from "lucide-react";
import { tripStore } from "../store/trips.store.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const EducationalTrip = () => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const { fetchTrips, trips } = tripStore();
  useState(() => {
    fetchTrips();
  }, []);

  console.log("Trips", trips);
  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
  };
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Educational Trips
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expand your horizons through immersive learning experiences beyond
            the classroom.
          </p>
        </div>

        {trips.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={trip.imageUrl}
                  alt={trip.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">{trip.title}</h2>
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
              </div>
            ))}
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
      <Footer />
    </div>
  );
};

export default EducationalTrip;
