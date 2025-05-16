import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import RenderSidebar from "./whichSideBar";
import NavBar from "./navBar";

const majorCourses = {
  "Computer Science": [
    "Data Structures",
    "Algorithms",
    "Operating Systems",
    "Web Development",
    "Database Systems",
  ],
  "Software Engineering": [
    "Software Architecture",
    "Testing and QA",
    "Agile Development",
    "Cloud Computing",
    "DevOps",
  ],
  "Electrical Engineering": [
    "Digital Logic",
    "Circuit Analysis",
    "Microprocessors",
    "Electromagnetics",
    "Signal Processing",
  ],
};

const hardcodedReports = [
  {
    title: "Web Development Internship",
    company: "Tech Solutions",
    introduction: "This internship focused on full-stack web development.",
    body: "I worked on several frontend and backend tasks including API integration and UI design.",
    courses: ["Web Development", "Database Systems"],
    status: "Flagged",
    comments: "Please improve the structure of the backend services.",
    appeal: "", // added for consistency
  },
  {
    title: "Cloud Computing Project",
    company: "CloudCorp",
    introduction: "A hands-on experience with cloud infrastructure and services.",
    body: "The internship involved deploying and managing applications on cloud platforms.",
    courses: ["Cloud Computing", "DevOps"],
    status: "Rejected",
    comments: "The project did not meet the required cloud standards.",
    appeal: "",
  },
  {
    title: "Data Structures Optimization",
    company: "DataGenics",
    introduction: "Focused on optimizing data structures for high-performance applications.",
    body: "I was involved in optimizing algorithms for faster search and retrieval.",
    courses: ["Data Structures", "Algorithms"],
    status: "Flagged",
    comments: "Optimizations were good but lacked sufficient documentation.",
    appeal: "",
  },
];

const MyReports = () => {
  const [role, setRole] = useState(null);
  const [report, setReport] = useState({
    title: "",
    company: "",
    introduction: "",
    body: "",
    courses: [],
  });
  const [reports, setReports] = useState([]);
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [activeReport, setActiveReport] = useState(null);
  const [appealMessage, setAppealMessage] = useState("");
  const userMajor = "Computer Science";

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    // Load from localStorage or set hardcoded reports
    const savedReports = JSON.parse(localStorage.getItem("myReports"));
    if (savedReports && savedReports.length > 0) {
      setReports(savedReports);
    } else {
      localStorage.setItem("myReports", JSON.stringify(hardcodedReports));
      setReports(hardcodedReports);
    }
  }, []);

  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  const handleReportChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleCourseSelection = (course) => {
    setSelectedCourses((prevCourses) =>
      prevCourses.includes(course)
        ? prevCourses.filter((c) => c !== course)
        : [...prevCourses, course]
    );
  };

  const handleSubmitReport = () => {
    if (report.title && report.company && report.introduction && report.body) {
      const updatedReport = {
        ...report,
        courses: selectedCourses,
        status: "Pending",
        comments: "",
        appeal: "",
      };
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

  const handleViewComments = (rep) => {
    setActiveReport(rep);
    setAppealMessage(rep.appeal || "");
    setShowComments(true);
  };

  const handleCloseComments = () => {
    setShowComments(false);
    setActiveReport(null);
    setAppealMessage("");
  };

  const downloadPDF = (rep) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(rep.title, 14, 20);
    doc.setFontSize(14);
    doc.text(`Company: ${rep.company}`, 14, 30);
    doc.text("Introduction:", 14, 40);
    doc.setFontSize(12);
    doc.text(doc.splitTextToSize(rep.introduction, 180), 14, 45);

    let y = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 60;

    doc.setFontSize(14);
    doc.text("Body:", 14, y);
    doc.setFontSize(12);
    y += 5;
    doc.text(doc.splitTextToSize(rep.body, 180), 14, y);

    y += doc.splitTextToSize(rep.body, 180).length * 6 + 10;

    doc.setFontSize(14);
    doc.text("Courses Applied:", 14, y);
    doc.setFontSize(12);
    y += 6;
    doc.text(rep.courses.join(", "), 14, y);

    y += 10;
    doc.setFontSize(14);
    doc.text(`Status: ${rep.status}`, 14, y);

    doc.save(`${rep.title.replace(/\s+/g, "_")}.pdf`);
  };

  const handleAppealChange = (e) => {
    setAppealMessage(e.target.value);
  };

  const submitAppeal = () => {
    if (!appealMessage.trim()) {
      alert("Appeal message cannot be empty.");
      return;
    }

    // Update appeal message in reports
    const updatedReports = reports.map((r) => {
      if (r.title === activeReport.title && r.company === activeReport.company) {
        return { ...r, appeal: appealMessage };
      }
      return r;
    });

    setReports(updatedReports);
    localStorage.setItem("myReports", JSON.stringify(updatedReports));

    // Update activeReport to reflect changes
    setActiveReport((prev) => ({ ...prev, appeal: appealMessage }));

    alert("Appeal submitted successfully.");
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 pt-12 overflow-x-hidden">
      {role && (
        <RenderSidebar
          role={role}
          sidebarWidth={sidebarWidth}
          isHovered={isHovered}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      )}
      <NavBar />

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

            <div className="mb-4">
              <h4 className="text-xl font-semibold text-green-700 mb-2">Select Courses Applied:</h4>
              {majorCourses[userMajor].map((course, index) => (
                <label key={index} className="block mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={course}
                    checked={selectedCourses.includes(course)}
                    onChange={() => handleCourseSelection(course)}
                    className="mr-2"
                  />
                  {course}
                </label>
              ))}
            </div>

            <button
              onClick={handleSubmitReport}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-all"
            >
              Submit Report
            </button>
          </div>
        )}

        <ul>
          {reports.map((rep, index) => (
            <li key={index} className="bg-gray-100 p-6 rounded-lg mb-6 shadow-md relative">
              <h4 className="text-2xl font-semibold text-green-700 mb-2">{rep.title}</h4>
              <p>
                <strong>Company:</strong> {rep.company}
              </p>
              <p>
                <strong>Introduction:</strong> {rep.introduction}
              </p>
              <p>
                <strong>Body:</strong> {rep.body}
              </p>
              <p>
                <strong>Courses Applied:</strong> {rep.courses.join(", ")}
              </p>
              <p>
                <strong>Status:</strong> {rep.status}
              </p>

              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => downloadPDF(rep)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Download PDF
                </button>

                {(rep.status === "Flagged" || rep.status === "Rejected") && (
                  <button
                    onClick={() => handleViewComments(rep)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                  >
                    View Comments
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Comments & Appeal Modal */}
        {showComments && activeReport && (
          <div
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
            onClick={handleCloseComments}
          >
            <div
              className="bg-white rounded-lg p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold mb-4 text-red-700">
                Comments for "{activeReport.title}"
              </h3>
              <p className="mb-6 whitespace-pre-line">{activeReport.comments}</p>

              {(activeReport.status === "Flagged" || activeReport.status === "Rejected") && (
                <>
                  <h4 className="font-semibold mb-2">Appeal Message:</h4>
                  <textarea
                    value={appealMessage}
                    onChange={handleAppealChange}
                    placeholder="Write your appeal message here..."
                    className="border border-gray-400 p-3 rounded w-full mb-4"
                    rows={4}
                  />
                  <button
                    onClick={submitAppeal}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                  >
                    Submit Appeal
                  </button>
                </>
              )}

              {activeReport.appeal && (
                <div className="mt-4 p-3 bg-gray-100 rounded border border-gray-300">
                  <h4 className="font-semibold mb-1">Previous Appeal:</h4>
                  <p className="whitespace-pre-line">{activeReport.appeal}</p>
                </div>
              )}

              <button
                onClick={handleCloseComments}
                className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;
