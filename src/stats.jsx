import React, { useState } from "react";
import SCADSidebar from "./scadSide";
import { useNavigate } from "react-router-dom";
import NavBar from "./navBar";

const SCADStatistics = () => {
    const navigate = useNavigate();
  const [reportGenerated, setReportGenerated] = useState(false);
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
  // Dummy stats
  const stats = {
    accepted: 42,
    rejected: 8,
    flagged: 5,
    avgReviewTime: "3.2 days",
    topCourses: ["CS401 - AI Applications", "DS210 - Data Analysis", "UX310 - Human Factors"],
    topRatedCompanies: [
      { name: "TechNova", rating: 4.9 },
      { name: "HealthSync", rating: 4.7 },
      { name: "GreenEdge", rating: 4.6 },
    ],
    topInternshipCompanies: [
      { name: "FinX", count: 18 },
      { name: "BrightLabs", count: 15 },
      { name: "Adwise", count: 14 },
    ],
  };

  const handleGenerateReport = () => {
    setReportGenerated(true);
    console.log("Generating report with current statistics...");
    // In real setup: export to PDF/CSV or trigger backend report logic
  };

  return (
     <div>
               <NavBar/> 

      <SCADSidebar
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    <div className="w-screen mt-24 bg-gray-100 min-h-screen text-gray-800 font-sans px-6 py-12"
  >
      <h1 className="text-4xl text-center font-poppins text-green-800 mb-10">
        SCAD Internship Statistics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Report counts */}
        <div className="bg-white p-6 rounded-lg shadow border-l-8 border-green-600">
          <h2 className="text-xl font-semibold mb-2">Report Summary</h2>
          <ul className="space-y-1">
            <li><strong>Accepted Reports:</strong> {stats.accepted}</li>
            <li><strong>Rejected Reports:</strong> {stats.rejected}</li>
            <li><strong>Flagged Reports:</strong> {stats.flagged}</li>
            <li><strong>Avg. Review Time:</strong> {stats.avgReviewTime}</li>
          </ul>
        </div>

        {/* Most used courses */}
        <div className="bg-white p-6 rounded-lg shadow border-l-8 border-blue-600">
          <h2 className="text-xl font-semibold mb-2">Top Courses Used</h2>
          <ul className="list-disc list-inside text-sm mt-2">
            {stats.topCourses.map((course, i) => (
              <li key={i}>{course}</li>
            ))}
          </ul>
        </div>

        {/* Top-rated companies */}
        <div className="bg-white p-6 rounded-lg shadow border-l-8 border-yellow-600">
          <h2 className="text-xl font-semibold mb-2">Top-Rated Companies</h2>
          <ul className="text-sm mt-2">
            {stats.topRatedCompanies.map((company, i) => (
              <li key={i}>
                {company.name} — <span className="font-medium">{company.rating}★</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top companies by internship count */}
        <div className="bg-white p-6 rounded-lg shadow border-l-8 border-purple-600">
          <h2 className="text-xl font-semibold mb-2">Top Internship Providers</h2>
          <ul className="text-sm mt-2">
            {stats.topInternshipCompanies.map((company, i) => (
              <li key={i}>
                {company.name} — <span className="font-medium">{company.count} internships</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Generate Report */}
      <div className="text-center mt-12">
  <button
    onClick={() => navigate("/scad/stats/report")}
    className="bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-green-800 transition-all"
  >
    Generate Report
  </button>
 
</div>
    </div>
        </div>

  );
};

export default SCADStatistics;
