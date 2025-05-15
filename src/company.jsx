import internshipImage from "./Assets/maybe.png";
import React, { useState } from "react";
import PostInternshipButton from "./post";
import CompanyProfile from "./companyProfile";
import SlidingSidebar from "./slidingBar";
import NavBar from "./navBar";
 // 

const Company = () => {
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
            <h1 className="text-5xl font-bold text-primary mb-4 leading-tight">
              Unlock your company's<br />
              potential with eager interns
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Boost your team's productivity by bringing in talented interns ready to make an impact.
            </p>
          </div>

          <div className="lg:w-2/3 mt-24">
            <img src={internshipImage} alt="Internship" className=" ml-12 " />
          </div>
        </div>
      

      {/* Sidebar injected here */}
      <SlidingSidebar
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default Company;
