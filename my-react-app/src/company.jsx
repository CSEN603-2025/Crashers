import internshipImage from "./Assets/intern.png";
import React, { useState } from "react";
import { Bell, User, FileText, Clipboard } from "lucide-react"; // Importing Lucide Icons
import PostInternshipButton from "./post";
import CompanyProfile from "./companyProfile";

import NavBar from "./navBar";



const Company = () => {
    
    const [showProfile, setShowProfile] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState("4rem");
    const [isHovered, setIsHovered] = useState(false);

    // Handle hover enter and leave events
    const handleMouseEnter = () => {
      setSidebarWidth("16rem"); // On hover, expand the sidebar to 16rem
      setIsHovered(true); // Set hovered to true
    };
  
    const handleMouseLeave = () => {
      setSidebarWidth("6rem"); // On hover leave, collapse it back to 4rem
      setIsHovered(false); // Set hovered to false
    };
  
  
  return (
        <div className="flex flex-col bg-white-100  font:poppins justify-center min-h-screen w-screen bg-white pl-0 relative">
      {showProfile ? (
  <CompanyProfile onBack={() => setShowProfile(false)} />
) : (

      <div className="flex flex-col md:flex-row transform items-center justify-between w-full max-w-screen-lg bg-white pl-0 ml-16 rounded-lg mr-12">
        {/* Left Section with Quote */}
        <div className="text-center md:text-left mr-0 ml-0 md:w-2/3">
        <h1 className="text-4xl font-bold text-primary mb-4 leading-tight">
  Unlock your company's<br />
  potential with eager interns
</h1>

          <p className="text-lg font:poppins mr-0 pr-0 text-gray-700 mb-6">
            Boost your team's productivity by bringing in talented interns ready to make an impact.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
          < PostInternshipButton/> 

            <button className="bg-yellow-500 text-white font-bold font:poppins py-2 px-6 rounded-md shadow-md hover:bg-yellow-600 transition-colors">
              View All Jobs
            </button>
          </div>
        </div>


        <div className="mt-8 lg:mt-0 lg:w-2/3 ">
          <img
            src={internshipImage}
            alt="Internship"
            className=" w-full ml-12 h-auto "
          />
        </div>
      </div>
    )}

      {/* Sliding Sidebar */}
      <div
        className="fixed top-16 right-0 h-full bg-gray-700 border-l border-gray-300 shadow-lg transition-all duration-300 z-20"
        style={{ width: sidebarWidth }} // Apply the dynamic width using inline style
        onMouseEnter={handleMouseEnter} // Trigger on hover enter
        onMouseLeave={handleMouseLeave} // Trigger on hover leave
      >

        <div className="flex flex-col pr-10 items-start px-4 py-6 gap-4">
          <span className="font-bold ml-20 mr-10 text-lg font-poppins text-white">Menu</span>
          <button className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-4">
          {!isHovered && <Bell className="inline-block mr-2" />}
          {isHovered && <span> <Bell className="inline-block mr-2" />Notifications</span>}

          </button>
          <button className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-4"
          onClick={() => setShowProfile(true)} >
          {!isHovered && <User className="inline-block mr-2" />}
          {isHovered && <span><User className="inline-block mr-2" />Profile</span>}
          </button>
          <button className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-4">
          {!isHovered && <FileText className="inline-block mr-2" />}
          {isHovered && <span>  <FileText className="inline-block mr-2" />Your Listings</span>}
          </button>
          <button className="text-left w-full bg-gray-700 text-white font-bold font:poppins hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md transform translate-x-4">
          {!isHovered && <Clipboard className="inline-block mr-2" />}
          {isHovered && <span> <Clipboard className="inline-block mr-2" /> All Jobs</span>}       </button>
        </div>
      </div>
    </div>
  );
};

export default Company;
