import React, { useState, useEffect } from 'react';
import NavBar from "./navBar";
import RenderSidebar from "./whichSideBar";
function GuidingVideo() {
      const [role, setRole] = useState(null); // State for role
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
    
    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        setRole(storedRole);
      }, []);
  return (
    <div className="min-h-screen w-screen bg-gray-100 flex flex-col items-center pt-24 overflow-y-auto">
      <NavBar />
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl border border-green-200 mt-5 p-10">
        {/* Header */}
        <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Guiding Video
        </h2>

        {/* Video Container */}
        <div className="video-container">
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/GgsbG3WEmHs?si=yWjvUEfDQHtvh1L-"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      {role && (
  <RenderSidebar
    role={role}
    sidebarWidth={sidebarWidth}
    isHovered={isHovered}
    handleMouseEnter={handleMouseEnter}
    handleMouseLeave={handleMouseLeave}
  />
)}
    </div>
  );
}

export default GuidingVideo;
