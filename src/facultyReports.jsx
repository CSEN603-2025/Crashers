import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import SCADSidebar from "./scadSide";

const dummyReports = [
  {
    id: 1,
    student: "Sara Ahmed",
    email: "sara.ahmed@scad.edu",
    title: "Frontend Internship at TechNova",
    status: "pending",
    major: "Computer Science",
    fileName: "INTERNSHIPREPORT.pdf",
    fileType: "pdf",
    fileUrl: "/files/INTERNSHIPREPORT.pdf",
    company: "TechNova",
    supervisor: "John Doe",
    startDate: "2024-06-01",
    endDate: "2024-08-31",
  },
  {
    id: 2,
    student: "Omar Youssef",
    email: "omar.youssef@scad.edu",
    title: "Marketing Research at Adwise",
    status: "accepted",
    major: "Marketing",
    fileName: "INTERNSHIPREPORT.pdf",
    fileType: "pdf",
    fileUrl: "/files/INTERNSHIPREPORT.pdf",
    company: "Adwise",
    supervisor: "Jane Smith",
    startDate: "2024-07-01",
    endDate: "2024-09-15",
  },
];

const FacultyReps = () => {
const [reports, setReports] = useState(dummyReports);
  const [statusFilter, setStatusFilter] = useState("all");
  const [majorFilter, setMajorFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);
  const [previewReport, setPreviewReport] = useState(null);
  const reportRef = useRef(null);

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
  const [statusDropdownId, setStatusDropdownId] = useState(null);


  const majors = ["all", ...new Set(reports.map((r) => r.major))];
  const statuses = ["all", "pending", "flagged", "rejected", "accepted"];

  const filteredReports = reports.filter((report) => {
    const statusMatch = statusFilter === "all" || report.status === statusFilter;
    const majorMatch = majorFilter === "all" || report.major === majorFilter;
    return statusMatch && majorMatch;
  });

  const downloadPDF = () => {
    if (reportRef.current) {
      html2pdf().from(reportRef.current).save(`${selectedReport.title}.pdf`);
    }
  };

  return (
    <div className="flex">
      <SCADSidebar
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />

      <div
        className="w-screen min-h-screen bg-gray-100 px-6 py-12 text-gray-800 font-poppins w-full"
style={{ paddingRight: sidebarWidth }}
      >
        <h1 className="text-4xl font-poppins text-green-800 text-center mb-10">
          Internship Reports
        </h1>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded w-60"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "all"
                  ? "All Statuses"
                  : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={majorFilter}
            onChange={(e) => setMajorFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded w-60"
          >
            {majors.map((major) => (
              <option key={major} value={major}>
                {major === "all" ? "All Majors" : major}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-6 max-w-screen-lg mx-auto">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white flex flex-col md:flex-row items-center p-6 rounded-lg shadow border-l-8 border-green-600 hover:shadow-lg transition"
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-green-700">{report.title}</h2>
                <span
  className={`px-2 py-1 rounded-full text-xs font-semibold ${
    report.status === "accepted"
      ? "bg-green-100 text-green-700"
      : report.status === "pending"
      ? "bg-yellow-100 text-yellow-800"
      : report.status === "flagged"
      ? "bg-red-100 text-red-700"
      : report.status === "rejected"
      ? "bg-red-200 text-red-800"
      : "bg-gray-100 text-gray-700"
  }`}
>
  {report.status}
</span>



              </div>
              
             <div className="flex flex-wrap gap-2 mt-4">
                 <div className="flex items-center gap-2">
  <button
    onClick={() =>
      setStatusDropdownId(statusDropdownId === report.id ? null : report.id)
    }
    className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 text-sm"
  >
    Change Status
  </button>

  {statusDropdownId === report.id && (
    <select
      value={report.status}
      onChange={(e) => {
        const updatedStatus = e.target.value;
        setReports((prev) =>
          prev.map((r) =>
            r.id === report.id ? { ...r, status: updatedStatus } : r
          )
        );
        setStatusDropdownId(null);
      }}
      className="border border-gray-300 rounded p-2 text-sm"
    >
      <option value="pending">Pending</option>
      <option value="flagged">Flagged</option>
      <option value="rejected">Rejected</option>
      <option value="accepted">Accepted</option>
    </select>
  )}
</div>

  <a
    href={report.fileUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 text-sm"
  >
    View Report
  </a>

  

  <a
    href={report.fileUrl}
    download
    className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800 transition text-sm"
  >
    Download Report
  </a>

  <button
    onClick={() => setSelectedReport(report)}
    className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 text-sm"
  >
    View Details
  </button>

 
</div>

    
   </div> 
          ))}
        </div> 

        {selectedReport && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white p-6 rounded-lg max-w-2xl w-full shadow-xl overflow-y-auto max-h-[90vh]">
              <div ref={reportRef}>
                <h2 className="text-2xl font-bold text-green-800 mb-4">
                  {selectedReport.title}
                </h2>
                <div className="text-sm text-gray-800 space-y-1">
                  <p><strong>Student:</strong> {selectedReport.student}</p>
                  <p><strong>Email:</strong> {selectedReport.email}</p>
                  <p><strong>Major:</strong> {selectedReport.major}</p>
                  <p><strong>Status:</strong> {selectedReport.status}</p>
                  <p><strong>Company:</strong> {selectedReport.company}</p>
                  <p><strong>Supervisor:</strong> {selectedReport.supervisor}</p>
                  <p><strong>Start Date:</strong> {selectedReport.startDate}</p>
                  <p><strong>End Date:</strong> {selectedReport.endDate}</p>
                  <p><strong>File:</strong> {selectedReport.fileName}</p>
                </div>
              </div>
              
              <div className="flex justify-end gap-4 mt-6">
               
                <button
                  onClick={() => setSelectedReport(null)}
                  className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default FacultyReps;
