import React from "react";
import { Bell, User, Users,BadgeCheck,FileText, Clipboard,NotebookPen,PhoneCall, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";


const SlidingSidebarPro = ({ setShowProfile, sidebarWidth, isHovered, handleMouseEnter, handleMouseLeave }) => {
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
  onClick={() => navigate("/certificates")}
  className="text-left w-full bg-gray-700 text-white font-bold text-sm font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
>
  <ShieldCheck className="inline-block mr-2 " />
  {isHovered && "Your Certificates"}
</button>

        <button className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1">
          <Clipboard className="inline-block mr-2" />
          {isHovered && "All Jobs"}
        </button>
                <button   onClick={() => navigate("/workshopPro")}
                className="text-left w-full bg-gray-700 text-white text-sm font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1">
          <NotebookPen className="inline-block mr-2 " />
          {isHovered && "Online Workshops"}
        </button>
<button
  onClick={() => navigate("/call")}
  className="text-left w-full bg-gray-700 text-white font-bold text-sm font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-1"
>
  <PhoneCall  className="inline-block mr-2 " />
  {isHovered && "Your Appointments"}
</button>
       <div className="relative group w-full flex items-center justify-center mt-10">
  <div className="flex items-center gap-1 bg-yellow-400 text-white font-bold ml-6 font-poppins text-xs px-3 py-2 rounded-full shadow-md">
    <BadgeCheck className="w-4 h-4 mr-1" />
 PRO
  </div>
 <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs p-2 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
  You’ve completed 3 months of internship!
</div>

</div>

      </div>
    </div>
  );
};

export default SlidingSidebarPro;
