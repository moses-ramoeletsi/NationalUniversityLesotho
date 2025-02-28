import React, { useState, useEffect } from "react";
import {
  Megaphone,
  Users,
  Calendar,
  Trophy,
  Mic,
  MapPin,
  Search,
  Tag,
} from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { debateStore } from "../store/debate.store.js";

const AnnualDebatesPage = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const { fetchDebates, debates } = debateStore();

  useEffect(() => {
    fetchDebates();
  }, []);

  const filteredDebates = debates.filter((debate) => {
    const debateDate = new Date(debate.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const matchesTab =
      (activeTab === "Upcoming" && debateDate > today) ||
      (activeTab === "Completed" && debateDate < today) ||
      (activeTab === "Ongoing" &&
        debateDate.toDateString() === today.toDateString());

    const matchesSearch =
      debate.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      debate.topic.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const sortedDebates = filteredDebates.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const getDebateStatus = (debateDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (debateDate.toDateString() === today.toDateString()) {
      return {
        text: "Ongoing",
        className: "bg-yellow-100 text-yellow-800",
      };
    } else if (debateDate > today) {
      return {
        text: "Upcoming",
        className: "bg-green-100 text-green-800",
      };
    } else {
      return {
        text: "Completed",
        className: "bg-gray-200 text-gray-700",
      };
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      <div className="container max-w-6xl mx-auto px-4 py-20">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-green-900 text-white p-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Annual University Debates
              </h1>
              <p className="text-green-100">
                Inspiring Dialogue, Challenging Perspectives
              </p>
            </div>
            <Megaphone className="h-12 w-12 text-white/70" />
          </div>

          <div className="p-4 bg-gray-100 flex items-center justify-between">
            <div className="flex space-x-4">
              {[
                { key: "Upcoming", label: "Upcoming Debates", icon: Calendar },
                { key: "Ongoing", label: "Ongoing Debates", icon: Mic },
                { key: "Completed", label: "Completed Debates", icon: Trophy },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                    activeTab === key
                      ? "bg-green-100 text-green-900 font-semibold"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-1/3">
              <input
                type="text"
                placeholder="Search debates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-green-700 focus:outline-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Debates List */}
          <div className="p-6">
            {sortedDebates.length > 0 ? (
              <div className="space-y-4">
                {sortedDebates.map((debate) => {
                  const debateStatus = getDebateStatus(new Date(debate.date));

                  return (
                    <div
                      key={debate.id}
                      className="bg-gray-50 p-5 rounded-lg border-l-4 border-green-700 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-bold text-gray-800">
                          {debate.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${debateStatus.className}`}
                        >
                          {debateStatus.text}
                        </span>
                      </div>

                      {/* Rest of the code remains the same */}
                      <p className="text-gray-600 mb-4 text-sm">
                        {debate.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4 text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Mic className="h-5 w-5 text-green-600" />
                          <span>{debate.topic}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-green-600" />
                          <span>
                            {new Date(debate.date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-5 w-5 text-green-600" />
                          <span>{debate.participants} Participants</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <MapPin className="h-5 w-5 text-green-600" />
                          <span>{debate.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Tag className="h-5 w-5 text-green-600" />
                          <span>{debate.eventType}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Trophy className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p>No {activeTab} debates found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualDebatesPage;
