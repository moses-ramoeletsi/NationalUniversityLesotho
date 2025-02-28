import { Building, NetworkIcon, HandshakeIcon } from "lucide-react";
import React, { useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import { collaborationStore } from "../store/collaboration.store";

const Partnership = () => {
  const { fetchCollaborators, collaborator } = collaborationStore();
  useEffect(() => {
    fetchCollaborators();
  }, []);
  const collaborationTypes = [
    {
      icon: <Building size={48} className="text-green-600" />,
      title: "Institutional Partnerships",
      description:
        "We forge strong partnerships with leading academic institutions, research centers, and think tanks to advance debate and discourse globally.",
      key_areas: [
        "Joint research initiatives",
        "Cross-institutional debate programs",
        "Academic exchange programs",
      ],
    },
    {
      icon: <NetworkIcon size={48} className="text-green-600" />,
      title: "Network Collaborations",
      description:
        "Our extensive network spans universities, debate societies, and international organizations, creating a global platform for intellectual exchange.",
      key_areas: [
        "International debate circuits",
        "Global debate forums",
        "Regional debate networks",
      ],
    },
    {
      icon: <HandshakeIcon size={48} className="text-purple-600" />,
      title: "Strategic Partnerships",
      description:
        "We collaborate with organizations that share our commitment to fostering critical thinking, open dialogue, and intellectual growth.",
      key_areas: [
        "Policy think tanks",
        "Educational technology platforms",
        "Non-profit organizations",
      ],
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-center text-green-900 mb-12">
          Collaborations & Partnerships
        </h1>

        {/* Collaboration Types */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-green-800 text-center mb-8">
            Our Collaboration Approach
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {collaborationTypes.map((collab, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {collab.icon}
                  <h3 className="ml-4 text-xl font-semibold text-gray-800">
                    {collab.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{collab.description}</p>
                <ul className="text-gray-700 list-disc pl-5">
                  {collab.key_areas.map((area, idx) => (
                    <li key={idx}>{area}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Current Partners */}
        <section className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-green-800 text-center mb-8">
            Our Current Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {collaborator.map((collaborator) => (
              <div
                key={collaborator.id}
                className="flex flex-col items-center bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <img
                  src={collaborator.image}
                  alt={`${collaborator.names} logo`}
                  className="h-full w-full object-cover mb-6 rounded-lg border-r-6"
                />
                <p className="text-center text-gray-800 font-medium">
                  {collaborator.names}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Partnership;
