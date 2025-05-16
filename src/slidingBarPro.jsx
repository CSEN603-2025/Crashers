import React from "react";
import { Bell, User, Users, BadgeCheck, FileText, Clipboard, NotebookPen, PhoneCall, ShieldCheck, Search, Eye, BookOpenCheck, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SlidingSidebarPro = ({ setShowProfile, sidebarWidth, isHovered, handleMouseEnter, handleMouseLeave }) => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed top-24 right-0 w-[6rem] bg-gray-700 border-l border-gray-300 shadow-lg transition-all duration-300 z-20 overflow-y-auto"
      style={{ width: sidebarWidth, height: 'calc(100vh - 6rem)' }}
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
          onClick={() => navigate("/certificates")}
          className="text-left w-full bg-gray-700 text-white font-bold text-sm font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <ShieldCheck className="inline-block mr-2 " />
          {isHovered && "Your Certificates"}
        </button>

        <button
          onClick={() => navigate("/myReports")}
          className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <FileText className="inline-block mr-2" />
          {isHovered && "My Reports"}
        </button>

   

        <button
          onClick={() => navigate("/workshopPro")}
          className="text-left w-full bg-gray-700 text-white text-sm font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <NotebookPen className="inline-block mr-2 " />
          {isHovered && "Online Workshops"}
        </button>

        <button
          onClick={() => navigate("/call")}
          className="text-left w-full bg-gray-700 text-white font-bold text-sm font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <PhoneCall className="inline-block mr-2 " />
          {isHovered && "Your Appointments"}
        </button>

        <button
          onClick={() => navigate("/pro/profviews")}
          className="text-left w-full bg-gray-700 text-white font-bold text-sm font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <Eye className="inline-block mr-2 " />
          {isHovered && "Profile Views"}
        </button>

        <button
          onClick={() => navigate("/pro/onlineassessments")}
          className="text-left w-full bg-gray-700 text-white font-bold text-sm font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <BookOpenCheck className="inline-block mr-2 " />
          {isHovered && "Online Assessments"}
        </button>

        <button
          onClick={() => navigate("/guidingVideo")}
          className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
        >
          <Video className="inline-block mr-2" />
          {isHovered && "Guiding Video"}
        </button>
      </div>
    </div>
  );
};

export default SlidingSidebarPro;
