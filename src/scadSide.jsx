import React from "react";
import {
  User,
  Clipboard,
  ChartNoAxesCombined,
  TvMinimalPlay,
  Building2,
  Landmark,
  PhoneCall,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SCADSidebar = ({
  sidebarWidth,
  isHovered,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed top-24 right-0 bg-gray-700 border-l border-gray-300 shadow-lg transition-all duration-300 z-20"
      style={{
        width: sidebarWidth,
        height: "calc(100vh - 6rem)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex flex-col pr-10 items-start px-4 py-6 gap-4 overflow-y-auto"
        style={{ height: "100%" }}
      >
        {isHovered && (
          <span className="font-semibold ml-4 text-sm font-poppins text-white">
            Menu
          </span>
        )}

        <button
          onClick={() => navigate("/scad/allstudents")}
          className="text-left w-full text-sm bg-gray-700 text-white font-poppins hover:border-black hover:bg-gray-500 transition duration-300 py-2 px-4 rounded-md"
        >
          <User className="inline-block mr-2" size={16} />
          {isHovered && "View All Students"}
        </button>

        <button
          onClick={() => navigate("/scad/companies")}
          className="text-left w-full text-sm bg-gray-700 text-white font-poppins hover:border-black hover:bg-gray-500 transition duration-300 py-2 px-4 rounded-md"
        >
          <Building2 className="inline-block mr-2" size={16} />
          {isHovered && "Applying Companies"}
        </button>

        <button
          onClick={() => navigate("/availableCompanies")}
          className="text-left w-full text-sm bg-gray-700 text-white font-poppins hover:border-black hover:bg-gray-500 transition duration-300 py-2 px-4 rounded-md"
        >
          <Landmark className="inline-block mr-2" size={16} />
          {isHovered && "Available Internships"}
        </button>

        <button
          onClick={() => navigate("/call")}
          className="text-left w-full text-sm bg-gray-700 text-white font-poppins hover:border-black hover:bg-gray-500 transition duration-300 py-2 px-4 rounded-md"
        >
          <PhoneCall className="inline-block mr-2" size={16} />
          {isHovered && "Your Appointments"}
        </button>

        <button
          onClick={() => navigate("/scad/allreports")}
          className="text-left w-full text-sm bg-gray-700 text-white font-poppins hover:border-black hover:bg-gray-500 transition duration-300 py-2 px-4 rounded-md"
        >
          <Clipboard className="inline-block mr-2" size={16} />
          {isHovered && "View All Reports"}
        </button>

        <button
          onClick={() => navigate("/scad/stats")}
          className="text-left w-full text-sm bg-gray-700 text-white font-poppins hover:border-black hover:bg-gray-500 transition duration-300 py-2 px-4 rounded-md"
        >
          <ChartNoAxesCombined className="inline-block mr-2" size={16} />
          {isHovered && "View Statistics"}
        </button>

        <button
          onClick={() => navigate("/scad/workshops")}
          className="text-left w-full text-sm bg-gray-700 text-white font-poppins hover:border-black hover:bg-gray-500 transition duration-300 py-2 px-4 rounded-md"
        >
          <TvMinimalPlay className="inline-block mr-2" size={16} />
          {isHovered && "View Workshops"}
        </button>
      </div>
    </div>
  );
};

export default SCADSidebar;
