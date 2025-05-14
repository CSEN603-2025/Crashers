import React, { useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import SCADSidebar from "./scadSide";
import NavBar from "./navBar";


const SCADStatsReport = () => {
  const reportRef = useRef();

  const handleDownload = () => {
    if (reportRef.current) {
      html2pdf()
        .from(reportRef.current)
        .set({
          margin: 1,
          filename: "SCAD-Internship-Report.pdf",
          html2canvas: { scale: 2 },
          jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        })
        .save();
    }
  };
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
      <SCADSidebar
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    <div className="w-screen mt-24 bg-gray-100 min-h-screen p-10 text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-md p-8 rounded-lg">
        <div ref={reportRef}>
          <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">
            SCAD Internship Statistics Report
          </h1>
          

          <h2 className="text-xl font-semibold text-green-800 mt-6 mb-2">1. Overview</h2>
          <p>
            This report provides a summary and analysis of internship-related statistics collected by SCAD. The goal is to evaluate the performance and engagement of students and partner companies in internship programs during the academic cycle.
          </p>

          <h2 className="text-xl font-semibold text-green-800 mt-6 mb-2">2. Report Summary</h2>
          <ul className="list-disc list-inside">
            <li><strong>Accepted Reports:</strong> 42</li>
            <li><strong>Rejected Reports:</strong> 8</li>
            <li><strong>Flagged Reports:</strong> 5</li>
            <li><strong>Average Review Time:</strong> 3.2 days</li>
          </ul>
          <p className="mt-2">
            <strong>Insight:</strong> The high number of accepted reports (42) indicates a strong submission rate and quality of internship experiences. However, 8 reports were rejected and 5 flagged, which suggests the need for improved supervision and clearer report guidelines.
          </p>

          <h2 className="text-xl font-semibold text-green-800 mt-6 mb-2">3. Top Courses Utilized</h2>
          <ul className="list-disc list-inside">
            <li>CS401 - AI Applications</li>
            <li>DS210 - Data Analysis</li>
            <li>UX310 - Human Factors</li>
          </ul>
          <p className="mt-2">
            <strong>Insight:</strong> Technical courses related to artificial intelligence and data analysis are leading in internship engagement, reflecting current market demands and student interest areas.
          </p>

          <h2 className="text-xl font-semibold text-green-800 mt-6 mb-2">4. Top-Rated Internship Companies</h2>
          <ul className="list-disc list-inside">
            <li>TechNova — 4.9★</li>
            <li>HealthSync — 4.7★</li>
            <li>GreenEdge — 4.6★</li>
          </ul>
          <p className="mt-2">
            <strong>Insight:</strong> TechNova continues to set the standard for internship satisfaction. Their consistent support and project engagement for students likely contributes to this rating.
          </p>

          <h2 className="text-xl font-semibold text-green-800 mt-6 mb-2">5. Top Internship Providers (By Count)</h2>
          <ul className="list-disc list-inside">
            <li>FinX — 18 internships</li>
            <li>BrightLabs — 15 internships</li>
            <li>Adwise — 14 internships</li>
          </ul>
          <p className="mt-2">
            <strong>Insight:</strong> FinX and BrightLabs are leading in offering internship opportunities. Partnerships with these companies should be maintained and potentially expanded.
          </p>

          <h2 className="text-xl font-semibold text-green-800 mt-6 mb-2">6. Recommendations</h2>
          <ul className="list-disc list-inside">
            <li>Improve rejected/flagged report handling: Offer templates or workshops to help students prepare stronger internship reports.</li>
            <li>Promote successful courses: Encourage faculty to align learning outcomes with internship opportunities in trending domains like AI and data.</li>
            <li>Strengthen company relations: Continue collaboration with highly rated companies and explore deeper engagement through long-term programs.</li>
          </ul>

         
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleDownload}
            className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
          >
            Download as PDF
          </button>
        </div>
      </div>
    </div>
        </div>

  );
};

export default SCADStatsReport;
