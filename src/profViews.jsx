import React, { useState } from "react";
import SlidingSidebarPro from "./slidingBarPro";
import NavBar from "./navBar";

const dummyViews = [
  {
    id: 1,
    companyName: "TechNova",
    industry: "Software Development",
    email: "careers@technova.com",
    viewedOn: "2024-05-01",
  },
  {
    id: 2,
    companyName: "GreenEdge Solutions",
    industry: "Sustainability",
    email: "hr@greenedge.org",
    viewedOn: "2024-05-03",
  },
  {
    id: 3,
    companyName: "BrightLabs",
    industry: "Biotech",
    email: "jobs@brightlabs.com",
    viewedOn: "2024-05-05",
  },
];

const CompaniesViewedMe = () => {
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
    <div className="flex">
      <NavBar/>
      <SlidingSidebarPro
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />

      <div
        className="w-screen min-h-screen mt-24 bg-gray-100 text-gray-800 font-poppins px-6 py-12 transition-all duration-300"
        
      >
        <h1 className="text-4xl font-poppins text-green-800 text-center mb-10">
          Companies That Viewed Your Profile
        </h1>

        <div className="max-w-4xl mx-auto space-y-6">
          {dummyViews.map((view) => (
            <div
              key={view.id}
              className="bg-white p-6 rounded-lg shadow border-l-8 border-green-600 hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-1">
                {view.companyName}
              </h2>
              <p className="text-sm text-green-500">{view.industry}</p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Email:</strong> {view.email}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <strong>Viewed On:</strong> {view.viewedOn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesViewedMe;
