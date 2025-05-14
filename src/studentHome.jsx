import internshipImage from "./Assets/maybe.png";
import React, { useState } from "react";
import PostInternshipButton from "./post";
import CompanyProfile from "./companyProfile";
import SlidingSidebarPro from "./slidingBarPro";
import NavBar from "./navBar";
 // 

const StudentHome = () => {
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  return (
    <div className="flex flex-col bg-white font:poppins justify-center min-h-screen w-screen relative">
      <NavBar/>
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-screen-lg bg-white pl-0 ml-16 rounded-lg mr-12">
          <div className="text-center md:text-left md:w-2/3">
            <h1 className="text-5xl font-bold font-poppins text-primary mb-4 leading-tight">
              From Campus To Career<br />
            </h1>
            <p className="text-lg font-poppins text-gray-700 mb-6">
           Empowering students with global, hands-on experience that truly matters.            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <PostInternshipButton />
              <button className="bg-purple border-primary text-white font-bold py-2 px-6 rounded-md shadow-md hover:bg-green-600 border-black transition-colors">
Apply Now!              </button>
            </div>
          </div>

          <div className="lg:w-2/3 mt-24">
            <img src={internshipImage} alt="Internship" className="w-full ml-12 h-auto" />
          </div>
        </div>
      

      {/* Sidebar injected here */}
      <SlidingSidebarPro
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default StudentHome;
