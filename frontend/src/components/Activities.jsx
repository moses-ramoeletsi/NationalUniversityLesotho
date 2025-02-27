import React from "react";
import { Link } from "react-router-dom";

const Activities = () => {
  return (
    <section id="activities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16 text-center text-green-900">
          Our Activities
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Link
            to="/seminars"
            className="block bg-green-100 p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-green-900">
              Seminars
            </h3>
            <p className="text-gray-700">
              Enriching educational experiences outside the classroom.
            </p>
          </Link>

          <Link
            to="/mental-health"
            className="block bg-green-100 p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-green-900">
              Mental Health Care
            </h3>
            <p className="text-gray-700">
              Supporting your well-being, every step of the way
            </p>
          </Link>

          <Link
            to="/education-trip"
            className="block bg-green-100 p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-green-900">
              Education Trip
            </h3>
            <p className="text-gray-700">
              Exciting trips that combine fun and learning opportunities.
            </p>
          </Link>

          <Link
            to="/annual-debates"
            className="block bg-green-100 p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-green-900">
              Annual Debates
            </h3>
            <p className="text-gray-700">
              Engage in thought-provoking discussions, exchange ideas.
            </p>
          </Link>

          <Link
            to="/partnership"
            className="block bg-green-100 p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2 text-green-900">
              Collaborations and Partnerships
            </h3>
            <p className="text-gray-700">
              Driving impact through meaningful alliances.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Activities;
