import React from "react";
import { Link } from "react-router-dom";

const ActivitiesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-green-900">
          Manage Activities
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Link
          to="/add-seminar"
          className="items-center justify-center text-center flex flex-col bg-green-100 p-4 md:p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
        >
          <h3 className="text-lg md:text-xl lg:text-xl font-semibold mb-2 text-green-900">
            Seminars
          </h3>
             <div className="w-20 h-1 bg-green-600 rounded-full mb-4"></div>
          <p className="text-sm md:text-base text-gray-700">
            Enriching educational experiences outside the classroom.
          </p>
        </Link>
        <Link
          to="/add-health-care"
          className="items-center justify-center text-center flex flex-col bg-green-100 p-4 md:p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
        >
          <h3 className="text-lg md:text-xl lg:text-xl font-semibold mb-2 text-green-900">
            Mental Health Care
          </h3>
             <div className="w-20 h-1 bg-green-600 rounded-full mb-4"></div>
          <p className="text-sm md:text-base text-gray-700">
            Supporting your well-being, every step of the way.
          </p>
        </Link>
        <Link
          to="/add-educational-trips"
          className="items-center justify-center text-center flex flex-col bg-green-100 p-4 md:p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
        >
          <h3 className="text-lg md:text-xl lg:text-xl font-semibold mb-2 text-green-900">
            Education Trip
          </h3>
             <div className="w-20 h-1 bg-green-600 rounded-full mb-4"></div>
          <p className="text-sm md:text-base text-gray-700">
            Exciting trips that combine fun and learning opportunities.
          </p>
        </Link>
        <Link
          to="/add-annual-debate"
          className="items-center justify-center text-center flex flex-col bg-green-100 p-4 md:p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1"
        >
          <h3 className="text-lg md:text-xl lg:text-xl font-semibold mb-2 text-green-900">
            Debates
          </h3>
        <div className="w-20 h-1 bg-green-600 rounded-full mb-4"></div>
          <p className="text-sm md:text-base text-gray-700">
            Discussions and develop critical thinking skills through structured
            debates on current and impactful topics.
          </p>
        </Link>
        <Link
          to="/collaboration"
          className=" bg-green-100 p-4 md:p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 items-center justify-center text-center flex flex-col"
        >
          <h3 className="text-lg md:text-xl lg:text-xl font-semibold mb-2 text-green-900">
            Collaboration & Partnership
          </h3>
          <div className="w-20 h-1 bg-green-600 rounded-full mb-4"></div>
          <p className="text-sm md:text-base text-gray-700">
            Giving back to the community through various initiatives.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ActivitiesPage;