import React, { useState } from "react";
import NavBar from "./navBar";
import SlidingSidebarPro from "./slidingBarPro";


function Certificates() {

  const certificates = [
    {
      id: 1,
      title: "React Live Workshop",
      speaker: "Sara Hossam - Frontend Lead at Meta",
      date: "2025-05-13",
    },
    {
      id: 2,
      title: "Git & GitHub Basics",
      speaker: "Mohamed Samir - DevOps Engineer",
      date: "2025-05-10",
    },
    // Add more certificates here
  ];
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
    <div className="min-h-screen w-screen bg-gray-100 p-6 font-poppins relative">
 <NavBar/>
      {/* Certificates List */} 
       
          <h1 className="font-poppins text-4xl mt-24 font-bold text-green-800 text-center mb-10">My Certificates</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-24">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500"
              >
                <h3 className="text-lg font-bold">{cert.title}</h3>
                <p className="text-sm text-gray-600">{cert.speaker}</p>
                <p className="text-sm text-gray-500">Date: {cert.date}</p>
              </div>
            ))}
          </div>
       
      <SlidingSidebarPro
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
}

export default Certificates;
