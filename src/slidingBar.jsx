// SlidingSidebar.jsx
import React from "react";
import { Bell, User, Users,FileText, Clipboard } from "lucide-react";
import { useNavigate } from "react-router-dom";


const SlidingSidebar = ({ setShowProfile, sidebarWidth, isHovered, handleMouseEnter, handleMouseLeave }) => {
    const navigate = useNavigate();

  return (
    <div
      className="fixed top-24 right-0 w-[6rem] h-full bg-gray-700 border-l border-gray-300 shadow-lg transition-all duration-300 z-20"
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
  onClick={() => navigate("/internships")}
  className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
>
  <FileText className="inline-block mr-2" />
  {isHovered && "Your Listings"}
</button>

        <button className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1">
          <Clipboard className="inline-block mr-2" />
          {isHovered && "All Jobs"}
        </button>
                <button   onClick={() => navigate("/currentInterns")}
                className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1">
          <Users className="inline-block mr-2" />
          {isHovered && "Current Interns"}
        </button>
      </div>
    </div>
  );
};

export default SlidingSidebar;
