import React, { useState, useEffect } from "react";
import RenderSidebar from "./whichSideBar";
import NavBar from "./navBar";

function InternshipApplications() {
  const [applications, setApplications] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);
  const [role, setRole] = useState(null);

  // Fetch role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  // Combine dummy + stored applications
  useEffect(() => {
    const dummyApplications = [
      {
        role: "Frontend Developer Intern",
        company: "TechNova",
        status: "Pending",
      },
      {
        role: "Marketing Intern",
        company: "Adwise Solutions",
        status: "Accepted",
      },
      {
        role: "UI/UX Design Intern",
        company: "CreativeHive",
        status: "Rejected",
      },
    ];

    const storedApps = JSON.parse(localStorage.getItem("appliedInternships")) || [];

    setApplications([...dummyApplications, ...storedApps]);
  }, []);

  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 pt-12 overflow-x-hidden">
      <NavBar />

      {/* Sidebar */}
      <div
        className="fixed left-0 top-0 h-full z-50 transition-all duration-300"
        style={{ width: sidebarWidth }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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

      {/* Main Content */}
      <div className="transition-all duration-300 mx-auto">
        <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md mt-14">
          <h2 className="text-3xl font-semibold text-green-700 mb-4 text-center">
            Internship Applications
          </h2>

          {applications.length === 0 ? (
            <p className="text-center text-green-600">
              You haven't applied to any internships yet.
            </p>
          ) : (
            <div className="space-y-4">
              {applications.map((application, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200"
                >
                  <h3 className="text-xl font-semibold text-green-700">
                    {application.role} at {application.company}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Status: {application.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InternshipApplications;
