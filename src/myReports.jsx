import React, { useState } from "react";
import { Link } from "react-router-dom";
import SlidingSidebar from "./SlidingSidebar";
import NavBar from "./navBar"; // Import the NavBar

const MyReports = () => {
  const [report, setReport] = useState({ title: "", company: "", introduction: "", body: "" });
  const [reports, setReports] = useState([]); // Stores all reports
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);

  // Sliding sidebar hover effects
  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  // Handle changes in the report form
  const handleReportChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  // Handle report submission
  const handleSubmitReport = () => {
    setReports([...reports, report]); // Add the new report to the list
    // Reset the form
    setReport({ title: "", company: "", introduction: "", body: "" });
  };

  // Handle deleting a report
  const handleDeleteReport = (index) => {
    const updatedReports = reports.filter((_, i) => i !== index);
    setReports(updatedReports);
  };

  return (
    <div className="relative w-screen min-h-screen bg-gray-100 pt-12">
      {/* NavBar */}
      <NavBar />

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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md mt-12">
        <h2 className="text-5xl font-semibold text-green-700 mb-6 text-center">My Internship Reports</h2>

        {/* Report Form */}
        <div className="mb-6">
          <h3 className="text-3xl font-semibold text-green-700 mb-4">Create Report</h3>

          <input
            type="text"
            name="title"
            value={report.title}
            onChange={handleReportChange}
            placeholder="Report Title"
            className="border border-green-400 p-2 rounded w-full mb-4"
          />
          <input
            type="text"
            name="company"
            value={report.company}
            onChange={handleReportChange}
            placeholder="Company Name"
            className="border border-green-400 p-2 rounded w-full mb-4"
          />
          <textarea
            name="introduction"
            value={report.introduction}
            onChange={handleReportChange}
            placeholder="Introduction"
            className="border border-green-400 p-4 rounded w-full mb-4"
            rows="3"
          />
          <textarea
            name="body"
            value={report.body}
            onChange={handleReportChange}
            placeholder="Body of the Report"
            className="border border-green-400 p-4 rounded w-full mb-4"
            rows="5"
          />

          <button
            onClick={handleSubmitReport}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
          >
            Submit Report
          </button>
        </div>

        {/* List of Reports */}
        <div>
          <h3 className="text-3xl font-semibold text-green-700 mb-4">Your Reports</h3>

          <ul>
            {reports.map((rep, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                <h4 className="text-xl font-semibold text-green-700">{rep.title}</h4>
                <p className="text-lg text-green-500">{rep.company}</p>
                <p className="text-sm text-gray-600">{rep.introduction}</p>
                <p className="text-sm text-gray-600">{rep.body}</p>
                
                <div className="flex mt-4 space-x-4">
                  
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyReports;
