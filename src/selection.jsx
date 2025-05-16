import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RenderSidebar from "./whichSideBar"; 
import NavBar from "./navBar"; // Importing the NavBar

function Selection() {
  const location = useLocation();
  const navigate = useNavigate();
  const internship = location.state;
  const [role, setRole] = useState(null); 
     useEffect(() => {
        const storedRole = localStorage.getItem('role');
        setRole(storedRole);
      }, []);

  console.log("Internship data received:", internship); // Debugging

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  // Handle file removal from the list
  const handleRemoveFile = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
  };

  // Handle document upload
  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      alert("Documents uploaded successfully.");
      setSelectedFiles([]); // Clear the list after upload
    } else {
      alert("Please select documents to upload.");
    }
  };

  // Handle internship application
  const handleApply = () => {
    if (selectedFiles.length === 0) {
      alert("You must upload at least one document before applying.");
      return;
    }

    let appliedInternships = JSON.parse(localStorage.getItem("appliedInternships")) || [];
    appliedInternships.push({
      ...internship,
      documents: selectedFiles.map((file) => file.name),
    });

    localStorage.setItem("appliedInternships", JSON.stringify(appliedInternships));
    alert("Application Submitted Successfully!");
    navigate("/availableCompanies");
  };

  // Sliding sidebar hover effects
  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 pt-12 relative">
      {/* Navigation Bar */}
      <NavBar />

      {/* Sliding Sidebar */}
      <div
        className="fixed right-0 top-0 h-full z-50 transition-all duration-300"
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

      {/* Main Content Area */}
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-semibold text-green-700 mb-4 text-center">
          {internship.title}
        </h2>
        <p className="text-green-600 text-lg mb-2">{internship.company}</p>
        <p className="text-gray-700 mb-2">Duration: {internship.duration ?? "N/A"}</p>
        <p className="text-gray-700 mb-2">Industry: {internship.industry ?? "N/A"}</p>

        {internship.skills && internship.skills.length > 0 ? (
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-green-600 mb-2">Skills Required:</h3>
            <ul className="list-disc list-inside text-gray-800">
              {internship.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-gray-700 mb-2">Skills Required: N/A</p>
        )}

        {/* Document Upload Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-green-600 mb-2">
            Upload CV and any Additional Documents:
          </h3>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="border border-green-400 p-2 rounded w-full mb-2"
          />

          {/* Display the list of selected documents */}
          {selectedFiles.length > 0 && (
            <div className="mt-4">
              <h4 className="text-green-700 font-semibold mb-2">
                Documents Ready for Upload:
              </h4>
              <ul className="list-disc list-inside text-gray-800 space-y-2">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="flex justify-between items-center">
                    {file.name}
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleUpload}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
          >
            Upload Documents
          </button>
        </div>

        <div className="flex justify-end mt-4">
          <button
            onClick={handleApply}
            className="bg-green-700 text-white py-3 rounded-md font-semibold hover:bg-green-800 transition-all"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Selection;
