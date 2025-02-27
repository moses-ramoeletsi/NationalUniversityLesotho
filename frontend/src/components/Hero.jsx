import React from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div
      id="home"
      className="relative bg-gradient-to-br from-green-900 to-green-700 text-white min-h-screen flex items-center"
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            National University of Lesotho
            <br />
            Sociology Association
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-green-100">
            "Sociological unity in a diverse community"
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="#about"
              className="bg-white text-green-900 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center"
            >
              Learn More
              <ArrowRight className="ml-2" size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
