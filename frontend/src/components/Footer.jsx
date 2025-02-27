import React from "react";
import { Mail, MapPin, ArrowRight } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="mr-4" size={20} />
                <span>nulsoca@email.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-4" size={20} />
                <span>National University of Lesotho, Roma Campus</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {["Home", "About", "Mission", "Activities"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="hover:text-green-200 transition-colors duration-200 flex items-center"
                  >
                    <ArrowRight className="mr-2" size={16} />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-green-800 text-center">
          <p>&copy; 2024 NUL SOCA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
