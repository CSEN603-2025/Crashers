import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SlidingSidebar from "./SlidingSidebar";

const ViewInternships = () => {
  const { state: company } = useLocation();
  const navigate = useNavigate(); // Initialize navigate for routing

  const [sidebarWidth, setSidebarWidth] = React.useState("6rem");
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 text-gray-800 font-sans">
      <div className="max-w-full mx-auto py-16 px-6 sm:px-8 h-full">
        <h1 className="font-poppins text-4xl font-bold text-green-800 text-center mb-10">
          {company.name} - Available Internships
        </h1>

        <div className="space-y-8">
          {company.internships.map((intern, index) => (
            <div
              key={intern.id}
              className="bg-white rounded-lg shadow-lg border-l-8 border-green-600 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-semibold text-green-700">
                    {index + 1}. {intern.title}
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <p>
                    <strong>Duration:</strong> {intern.duration}
                  </p>
                  <p>
                    <strong>Paid:</strong> {intern.paid ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Expected Salary:</strong> {intern.salary}
                  </p>
                  <p>
                    <strong>Skills Required:</strong> {(intern.skills?.join(", ")) || "No skills specified"}
                  </p>
                </div>

                <div className="text-sm text-gray-700 mt-4">
                  <strong>Job Description:</strong>
                  <p className="mt-1">
                    {intern.description || "No description provided."}
                  </p>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => navigate('/selection', { state: intern })}  // Pass the selected internship data
                    className="bg-green-600 text-white font-bold font-poppins py-2 px-6 rounded-md shadow-md hover:bg-green-700 transition-colors"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SlidingSidebar
        setShowProfile={() => {}}
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default ViewInternships;
