import React from "react";
import { Bell, User, Folder, Briefcase, Search, FileText } from "lucide-react"; // Imported FileText icon for My Reports
import { useNavigate } from "react-router-dom";

const StudentSlidingSidebar = ({ sidebarWidth, isHovered, handleMouseEnter, handleMouseLeave }) => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed right-0 top-24 h-full bg-gray-700 border-l border-gray-300 shadow-lg transition-all duration-300 z-50"
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
        <button
          onClick={() => navigate("/AvailableCompanies")}
          className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <Search className="inline-block mr-2" />
          {isHovered && "Discover Companies"}
        </button>

        <button
          onClick={() => navigate("/InternshipApplications")}
          className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <Folder className="inline-block mr-2" />
          {isHovered && "Internship Applications"}
        </button>

        {/* My Internships Button */}
        <button
          onClick={() => navigate("/AllInternships")}
          className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <Briefcase className="inline-block mr-2" />
          {isHovered && "My Internships"}
        </button>

        {/* My Reports Button */}
        <button
          onClick={() => navigate("/myReports")}  // Navigate to MyReports page
          className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <FileText className="inline-block mr-2" />  {/* File icon for My Reports */}
          {isHovered && "My Reports"}
        </button>
      </div>
    </div>
  );
};

export default StudentSlidingSidebar;
