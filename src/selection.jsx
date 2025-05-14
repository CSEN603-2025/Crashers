import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SlidingSidebar from "./SlidingSidebar";

function Selection() {
  const location = useLocation();
  const navigate = useNavigate();
  const internship = location.state;

  console.log("Internship data received:", internship); // Debugging

  const [documents, setDocuments] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  // Handle document upload
  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      setDocuments((prev) => [...prev, ...selectedFiles]);
      setSelectedFiles([]);
      alert("Documents uploaded successfully.");
    } else {
      alert("Please select documents to upload.");
    }
  };

  // Handle internship application
  const handleApply = () => {
    let appliedInternships = JSON.parse(localStorage.getItem("appliedInternships")) || [];
    appliedInternships.push(internship);
    localStorage.setItem("appliedInternships", JSON.stringify(appliedInternships));
    alert("Application Submitted Successfully!");
    navigate("/availableCompanies");
  };

  // Sliding sidebar hover effects (if you are using it)
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
      {/* Sliding Sidebar */}
      <div
        className="fixed right-0 top-0 h-full z-50 transition-all duration-300"
        style={{ width: sidebarWidth }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SlidingSidebar
          sidebarWidth={sidebarWidth}
          isHovered={isHovered}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl mx-auto">
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

        {/* Additional Document Upload Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-green-600 mb-2">
            Upload Additional Documents:
          </h3>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="border border-green-400 p-2 rounded w-full mb-2"
          />
          <button
            onClick={handleUpload}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Upload Documents
          </button>

          {/* Display the list of uploaded documents */}
          {documents.length > 0 && (
            <div className="mt-4">
              <h4 className="text-green-700 font-semibold mb-2">
                Uploaded Documents:
              </h4>
              <ul className="list-disc list-inside text-gray-800">
                {documents.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Apply Now Button */}
        <button
          onClick={handleApply}
          className="w-full bg-green-700 text-white py-3 rounded-md font-semibold hover:bg-green-800 transition-all"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default Selection;
