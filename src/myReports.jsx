import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import SlidingSidebar from "./SlidingSidebar";
import NavBar from "./navBar";

const majorCourses = {
  "Computer Science": ["Data Structures", "Algorithms", "Operating Systems", "Web Development", "Database Systems"],
  "Software Engineering": ["Software Architecture", "Testing and QA", "Agile Development", "Cloud Computing", "DevOps"],
  "Electrical Engineering": ["Digital Logic", "Circuit Analysis", "Microprocessors", "Electromagnetics", "Signal Processing"],
};

const MyReports = () => {
  const userMajor = "Computer Science";
  const [report, setReport] = useState({ title: "", company: "", introduction: "", body: "", courses: [] });
  const [reports, setReports] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  // Load reports from local storage on component mount
  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem("myReports")) || [];
    setReports(storedReports);
  }, []);

  // Sidebar hover effects
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

  // Handle course selection
  const handleCourseSelection = (course) => {
    setSelectedCourses((prevCourses) =>
      prevCourses.includes(course)
        ? prevCourses.filter((c) => c !== course)
        : [...prevCourses, course]
    );
  };

  // Handle report submission and save to local storage
  const handleSubmitReport = () => {
    if (report.title && report.company && report.introduction && report.body) {
      const updatedReport = { ...report, courses: selectedCourses };
      const updatedReports = [...reports, updatedReport];
      setReports(updatedReports);
      localStorage.setItem("myReports", JSON.stringify(updatedReports));
      setReport({ title: "", company: "", introduction: "", body: "", courses: [] });
      setSelectedCourses([]);
      setShowForm(false);
    } else {
      alert("Please fill out all fields before submitting.");
    }
  };

  // Handle PDF generation
  const handleDownloadPDF = (rep) => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text(rep.title, 20, 20);
    doc.setFontSize(14);
    doc.text(`Company: ${rep.company}`, 20, 30);

    doc.setFontSize(16);
    doc.text("Introduction:", 20, 50);
    doc.setFontSize(12);
    doc.text(rep.introduction, 20, 60, { maxWidth: 170 });

    doc.setFontSize(16);
    doc.text("Body:", 20, 100);
    doc.setFontSize(12);
    doc.text(rep.body, 20, 110, { maxWidth: 170 });

    if (rep.courses.length > 0) {
      doc.setFontSize(16);
      doc.text("Courses Applied:", 20, 160);
      doc.setFontSize(12);
      doc.text(rep.courses.join(", "), 20, 170, { maxWidth: 170 });
    }

    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 280);
    doc.save(`${rep.title}_Report.pdf`);
  };

  return (
    <div className=" w-screen min-h-screen bg-gray-100 pt-12 overflow-x-hidden">
      <NavBar />

      {/* Sliding Sidebar */}
      <div
        className="fixed left-0 top-0 h-full z-50 transition-all duration-300"
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
      <div
        className="transition-all duration-300 mx-auto"
        // style={{ width: `calc(100% - ${sidebarWidth})`, marginLeft: sidebarWidth }}
      >
        <div className="max-w-4xl mx-auto p-10 bg-white rounded-xl shadow-md mt-14">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl font-semibold text-green-700">My Internship Reports</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-all"
            >
              {showForm ? "Close Form" : "Create a New Report"}
            </button>
          </div>

          {/* Report Form */}
          {showForm && (
            <div className="border-t pt-6 mb-10">
              <h3 className="text-3xl font-semibold text-green-700 mb-4">New Report</h3>
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
            </div>
          )}

          {/* List of Reports */}
          <ul>
            {reports.map((rep, index) => (
              <li key={index} className="bg-gray-100 p-6 rounded-lg mb-6 shadow-md">
                <h4 className="text-2xl font-semibold text-green-700">{rep.title}</h4>
                <p className="text-lg text-green-500 mb-2">{rep.company}</p>
                <p className="text-sm text-gray-600 mb-2">{rep.introduction}</p>
                <p className="text-sm text-gray-600">{rep.body}</p>
                {rep.courses.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">Courses: {rep.courses.join(", ")}</p>
                )}
                <button
                  onClick={() => handleDownloadPDF(rep)}
                  className="bg-green-600 text-white px-4 py-2 rounded mt-4 hover:bg-green-700"
                >
                  Download PDF
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyReports;
