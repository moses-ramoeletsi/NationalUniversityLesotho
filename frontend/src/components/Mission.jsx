import React from "react";
import { ChevronRight } from "lucide-react";
const Mission = () => {
  return (
    <section
      id="mission"
      className="py-24 bg-gradient-to-br from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16 text-center text-green-900">
          Our Mission
        </h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-8 text-green-900">
              Core Values
            </h3>
            <ul className="space-y-6">
              {[
                "Academic excellence",
                "Collaboration and partnership",
                "Conducting research",
                "Dignified representation of sociology",
              ].map((value, index) => (
                <li
                  key={index}
                  className="flex items-center p-4 bg-green-50 rounded-lg"
                >
                  <ChevronRight className="text-green-600 mr-4" size={20} />
                  <span className="text-gray-800 font-medium">{value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center">
            <div className="bg-green-900 text-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
              <p className="text-lg leading-relaxed">
                We envision a world where sociological understanding is
                harnessed to empower individuals and communities, leading to
                social cohesion, justice and sustainable development. Our
                mission is to create a unified community among sociology
                students and foster an environment where diversity, inclusivity
                and academic rigor thrive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
