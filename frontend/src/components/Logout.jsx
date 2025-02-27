import React, { useState } from "react";
import { Users, Activity, CalendarClock, Settings, LogOut, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const [activeSection, setActiveSection] = useState("members");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { name: "Members", icon: Users, path: "/members" },
    { name: "Activities", icon: Activity, path: "/activities" },
    { name: "Meetings", icon: CalendarClock, path: "/meetings" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];
  const renderNavigation = (isMobile = false) => (
    <nav className={`${isMobile ? 'flex flex-col' : 'mt-6'}`}>
      {navigationItems.map((item) => (
        <button
          key={item.name}
          onClick={() => {
            setActiveSection(item.name.toLowerCase());
            navigate(item.path);
            if (isMobile) setIsMobileMenuOpen(false);
          }}
          className={`
            flex items-center 
            ${isMobile 
              ? 'w-full px-4 py-3 text-left border-b border-green-700' 
              : 'w-full px-6 py-3 text-left'}
            ${activeSection === item.name.toLowerCase()
              ? "bg-green-800"
              : "hover:bg-green-800"}
          `}
        >
          <item.icon className="mr-4" size={20} />
          <span className={`${isMobile ? 'block' : 'block'} sm:block`}>
            {item.name}
          </span>
        </button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col sm:flex-row">
      <div className="sm:hidden absolute top-4 left-4 z-50">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-green-900 p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className={`
        fixed inset-y-0 left-0 w-64 bg-green-900 text-white 
        transform transition-transform duration-300
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        sm:translate-x-0 sm:block
        z-40
      `}>
        <div className="p-6">
          <h2 className="text-xl sm:text-2xl font-bold">Admin Panel</h2>
        </div>
        {renderNavigation()}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            className="w-full flex items-center justify-center px-4 py-2 bg-green-800 rounded-md hover:bg-green-700"
          >
            <LogOut className="mr-2" size={20} />
            <span className="sm:block hidden">Logout</span>
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black opacity-50 sm:hidden z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
       <div className="sm:ml-64 p-4 sm:p-8 w-full mt-16 sm:mt-0">
        {children}
      </div>
    </div>
    // <div className="min-h-screen flex">
    //   {/* Sidebar */}
    //   <div className="fixed inset-y-0 left-0 w-64 bg-green-900 text-white">
    //     <div className="p-6">
    //       <h2 className="text-2xl font-bold">Admin Panel</h2>
    //     </div>
    //     <nav className="mt-6">
    //       {navigationItems.map((item) => (
    //         <button
    //           key={item.name}
    //           onClick={() => {
    //             setActiveSection(item.name.toLowerCase());
    //             navigate(item.path);
    //           }}
    //           className={`w-full flex items-center px-6 py-3 text-left ${
    //             activeSection === item.name.toLowerCase()
    //               ? "bg-green-800"
    //               : "hover:bg-green-800"
    //           }`}
    //         >
    //           <item.icon className="mr-4" size={20} />
    //           {item.name}
    //         </button>
    //       ))}
    //     </nav>
    //     <div className="absolute bottom-0 left-0 right-0 p-6">
    //       <button
    //         // Add your logout logic here
    //         className="w-full flex items-center justify-center px-4 py-2 bg-green-800 rounded-md hover:bg-green-700"
    //       >
    //         <LogOut className="mr-2" size={20} />
    //         Logout
    //       </button>
    //     </div>
    //   </div>

    //   {/* Main content */}
    //   <div className="ml-64 p-8 w-full">{children}</div>
    // </div>
  );
};

export default Layout;
