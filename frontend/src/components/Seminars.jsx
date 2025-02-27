import React, { useEffect } from "react";
import { seminarStore } from "../store/seminars.store.js";
import Navbar from "./Navbar.jsx"
const Seminars = () => {
  const { fetchSeminars, seminars } = seminarStore();
  useEffect(() => {
    fetchSeminars();
  }, []);
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-12">
          Seminars
        </h2>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-green-900 mb-6">
            Upcoming Seminars
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {seminars.map((seminar) => (
              <div
                key={seminar.id}
                className="p-6 bg-green-50 rounded-lg shadow"
              >
                <h4 className="text-xl font-semibold text-green-900">
                  {seminar.title}
                </h4>
                <p className="text-gray-700 mt-2">{seminar.description}</p>
                <p className="text-gray-500 mt-2">
                  <strong>Date:</strong> {seminar.date} <br />
                  <strong>Time:</strong> {seminar.time} <br />
                  <strong>Location:</strong> {seminar.location}
                  <br />
                  <strong>Location:</strong> {seminar.type} <br />
                  <strong>Location:</strong> {seminar.highlights}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seminars;
