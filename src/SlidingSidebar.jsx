import React from "react";
import { Bell, User, Folder, Briefcase, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SlidingSidebar = ({ sidebarWidth, isHovered, handleMouseEnter, handleMouseLeave }) => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed right-0 top-0 h-full bg-gray-700 border-l border-gray-300 shadow-lg transition-all duration-300 z-50"
      style={{ width: sidebarWidth }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col pr-10 items-start px-4 py-6 gap-4">
        {isHovered && (
          <span className="font-bold ml-4 text-lg font-poppins text-white">
            Menu
          </span>
        )}

        {/* Notifications
        <button
          className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <Bell className="inline-block mr-2" />
          {isHovered && "Notifications"}
        </button> */}

        {/* Profile */}
        <button
          onClick={() => navigate("/studentProfile")}
          className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <User className="inline-block mr-2" />
          {isHovered && "Profile"}
        </button>

        {/* Internship Applications */}
        <button
          onClick={() => navigate("/InternshipApplications")}
          className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <Folder className="inline-block mr-2" />
          {isHovered && "Internship Applications"}
        </button>

        {/* Apply Now */}
        {/* <button
          onClick={() => navigate("/AvailableInternships")}
          className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <Briefcase className="inline-block mr-2" />
          {isHovered && "Apply Now"}
        </button> */}

        {/* Discover Companies */}
        <button
          onClick={() => navigate("/AvailableCompanies")}
          className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <Search className="inline-block mr-2" />
          {isHovered && "Discover Companies"}
        </button>

        {/* My Internships Button */}
        <button
          onClick={() => navigate("/AllInternships")}
          className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <Briefcase className="inline-block mr-2" />
          {isHovered && "My Internships"}
        </button>
      </div>
    </div>
  );
};

export default SlidingSidebar;
