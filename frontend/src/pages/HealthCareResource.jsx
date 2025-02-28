import React, { useEffect, useState } from "react";
import {
  Book,
  MessageCircle,
  HeartPulse,
  Headphones,
  CalendarCheck,
  ShieldCheck,
  MapPin,
  Clock,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { healthCareStore } from "../store/healthcare.store.js";

const MentalHealthResourcePage = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const { fetchHealthCare, healthCare } = healthCareStore();

  useEffect(() => {
    fetchHealthCare();
  }, []);

  const resources = {
    overview: {
      title: "Your Mental Health Matters",
      content:
        "Navigating university life can be challenging. We're here to support you every step of the way. Mental health is just as important as physical health, and seeking help is a sign of strength, not weakness.",
    },
    counseling: {
      title: "Counseling Services",
      content:
        "Our professional counselors provide confidential support for students dealing with stress, anxiety, depression, relationship issues, and personal challenges. Individual and group counseling sessions are available.",
      contact: "Campus Counseling Center: (266) 58673866/ 68247869",
    },
    workshops: {
      title: "Wellness Workshops",
      content:
        "Join our free workshops designed to help you develop coping strategies, stress management techniques, and build resilience. Topics include mindfulness, time management, and mental health awareness.",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
    <Navbar />
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-green-600 text-white p-6 flex flex-col md:flex-row items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Student Mental Health Resources
            </h1>
            <p className="text-green-100 text-sm md:text-base">
              Supporting your well-being, every step of the way
            </p>
          </div>
          <HeartPulse className="h-12 w-12 text-white/70 mt-4 md:mt-0" />
        </div>

        {/* Navigation Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-b">
          {[
            { key: "overview", icon: HeartPulse, label: "Overview" },
            { key: "counseling", icon: MessageCircle, label: "Counseling" },
            { key: "workshops", icon: CalendarCheck, label: "Workshops" },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`flex items-center justify-center p-4 space-x-2 transition-all duration-300 ${
                activeSection === key
                  ? "bg-green-100 text-green-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50 hover:text-green-600"
              }`}
            >
              <Icon className="h-5 w-5 mr-2" />
              <span className="text-sm md:text-base">{label}</span>
            </button>
          ))}
        </div>

        {/* Content Section */}
        <div className="p-6 min-h-[400px]">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
            {resources[activeSection].title}
          </h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            {resources[activeSection].content}
          </p>

          {/* Counseling Section */}
          {activeSection === "counseling" && (
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-800 mb-2">
                Contact Information
              </h3>
              <p className="text-green-700 flex items-center">
                <Headphones className="mr-2 text-green-600" />
                {resources.counseling.contact}
              </p>
            </div>
          )}

          {/* Workshops Section */}
          {activeSection === "workshops" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-700 mb-2 text-xl">
                Upcoming Workshops
              </h3>
              {healthCare.length > 0 ? (
                healthCare.map((workshop) => (
                  <div
                    key={workshop.id}
                    className="bg-gray-100 p-4 rounded-lg hover:shadow-md transition-all duration-300 border-l-4 border-green-500"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                      <h4 className="font-bold text-gray-800">
                        {workshop.title}
                      </h4>
                      <span className="text-sm text-gray-600 bg-green-100 px-2 py-1 rounded mt-1 md:mt-0">
                        {workshop.description}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{workshop.location}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No upcoming workshops at the moment.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="bg-gray-100 p-6 text-center">
          <div className="flex flex-col md:flex-row justify-center space-x-0 md:space-x-6 mb-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <Headphones className="h-6 w-6 text-green-600" />
              <span>24/7 Support Hotline</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700 mt-2 md:mt-0">
              <ShieldCheck className="h-6 w-6 text-green-600" />
              <span>Confidential Services</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Remember: Your mental health is a priority. Don't hesitate to
            reach out.
          </p>
        </div>
      </div>
    </div>
  </div>  );
};

export default MentalHealthResourcePage;
