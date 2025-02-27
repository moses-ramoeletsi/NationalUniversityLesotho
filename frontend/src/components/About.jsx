import React, { useEffect } from "react";
import { MapPin, Clock, Podcast } from "lucide-react";
import { adminFunctionStore } from "../store/user.store";
import { meetingStore } from "../store/meeting.store";

const About = () => {
  const { fetchUsers, users } = adminFunctionStore();
  const { fetchMeeting, meetingItem } = meetingStore();
  
  useEffect(() => {
    fetchUsers();
    fetchMeeting();
  }, []);


  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 md:mb-16 text-center text-green-900">
          About Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          <div className="space-y-6 sm:space-y-8">
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
              The National University of Lesotho Sociology Association (NUL
              SOCA) is an academic association formed in 2024 to promote the
              study of sociology and related disciplines. Through collaborative
              efforts, we aim to deepen our understanding of human behavior,
              social structures, and cultural dynamics.
            </p>
            {users.length > 0 && (
              <div className="bg-green-50 p-6 sm:p-8 rounded-xl">
                <h3 className="text-xl sm:text-2xl md:text-2xl font-bold mb-2 text-green-900">
                  Key Personnel
                </h3>
                <ul className="space-y-2">
                  {users.map((user) => (
                    <li 
                      key={user._id} 
                      className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0"
                    >
                      <span className="font-semibold text-green-900 sm:w-32 text-sm sm:text-base">
                        {user.personnelType}
                      </span>
                      <span className="text-gray-700 text-sm sm:text-base">
                        {user.firstName} {user.lastName}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {meetingItem.length > 0 && (
            <div className="bg-gradient-to-br from-green-50 to-white p-6 sm:p-8 rounded-xl shadow-lg">
              <h3 className="text-xl sm:text-2xl md:text-2xl font-bold mb-6 sm:mb-8 text-green-900">
                Meeting Information
              </h3>
              {meetingItem.map((meeting, index) => (
                <div key={index} className="space-y-4 sm:space-y-6">
                  <div className="flex items-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                    <Clock className="text-green-600 mr-3 sm:mr-4 flex-shrink-0" size={20} sm:size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                        {meeting.frequency}
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {meeting.day}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                    <MapPin className="text-green-600 mr-3 sm:mr-4 flex-shrink-0" size={20} sm:size={24} />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                        Location
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm">
                        {meeting.location}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 p-3 sm:p-4 bg-green-100 rounded-lg">
                    <p className="text-green-900 font-medium text-center text-xs sm:text-sm">
                      {meeting.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;