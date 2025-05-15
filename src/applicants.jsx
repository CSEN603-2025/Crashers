import React, { useState } from "react";
import SlidingSidebar from "./slidingBar";
import NavBar from "./navBar";
import cv from "./Assets/CV.pdf";
import AcceptedApplicantsModal from "./AcceptedApplicantsModal"; // You'll create this


// Sample applicants data
const applicants = [
  {
    id: 1,
    name: "Sara Ali",
    internship: "Frontend Developer Internship",
    status: "Pending",
    email: "sara@example.com",
    phone: "0123456789",
    details: "Sara is proficient in React and TailwindCSS.",
    appliedOn: "2025-05-01",
    startDate: "2025-07-15",
    endDate: "2025-10-01",
    cvFile: cv  // <-- hardcoded CV file here

  },
  {
    id: 2,
    name: "Ahmed Youssef",
    internship: "Backend Developer Internship",
    status: "Accepted",
    email: "ahmed@example.com",
    phone: "0112233445",
    details: "Ahmed has experience with Node.js and MongoDB.",
    appliedOn: "2025-05-03",
    startDate: "2025-07-15",
    endDate: "2025-09-05",
    cvFile: cv // <-- hardcoded CV file here

  },
   {
    id: 3,
    name: "Malak Soliman",
    internship: "Marketing Internship",
    status: "Accepted",
    email: "malak@example.com",
    phone: "0112233445",
    details: "Malak has experience with Social Media managing and PR.",
    appliedOn: "2025-08-13",
    startDate: "2025-08-15",
    endDate: "2025-09-15",
    cvFile: cv  // <-- hardcoded CV file here



  },
];

// Status options for filtering
const statusOptions = [
  "Pending",
  "Finalized",
  "Accepted",
  "Rejected",
];

export default function Applicants() {
  const [selectedInternship, setSelectedInternship] = useState("All");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [allApplicants, setAllApplicants] = useState(applicants);
  const [showAcceptedModal, setShowAcceptedModal] = useState(false);

  const internships = ["All", ...new Set(applicants.map((a) => a.internship))];

  // Filter applicants based on selected internship
  const filteredApplicants =
    selectedInternship === "All"
      ? allApplicants
      : allApplicants.filter((app) => app.internship === selectedInternship);

  // Update applicant status
  const updateStatus = (id, newStatus) => {
    const updated = allApplicants.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    setAllApplicants(updated);
    if (selectedApplicant?.id === id) {
      setSelectedApplicant({ ...selectedApplicant, status: newStatus });
    }
  };
   const [showProfile, setShowProfile] = useState(false);
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
    <div className="bg-gray-100 w-screen mt-20  min-h-screen py-12 px-6">
        <NavBar/>
        <div className="flex justify-end mr-32">
        
    </div>
      {/* Filter Dropdown */}
      <div className="mb-6 text-right mr-32">
        <div className="flex justify-between items-center mb-6 mt-6">
        <h1 className="text-3xl text-primary font-semibold font-poppins text-left ml-12 mb-2">
        Applications:
      </h1>
<div className="flex justify-end w-full">
  <label className="font-medium text-green-700 mr-4">Filter by Internship:</label>
</div>        <select
          value={selectedInternship}
          onChange={(e) => setSelectedInternship(e.target.value)}
          className="px-3 py-2 rounded border border-green-300 bg-white shadow-sm"
        >
          {internships.map((title) => (
            <option key={title}>{title}</option>
          ))}
        </select>
        </div>
      </div>

      {/* List of Applicants */}
      <div className="space-y-2 mr-32">
        {filteredApplicants.map((app) => (
          <div
            key={app.id}
            onClick={() => setSelectedApplicant(app)}
            className="flex items-center p-4 bg-white rounded shadow-md cursor-pointer hover:bg-green-100 transition"
          >
            {/* Circle with initials */}
            <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold mr-4">
              {app.name
                .split(" ")
                .map((word) => word[0])
                .join("")}
            </div>

            {/* Applicant Info */}
            <div className="flex-grow">
              <p className="text-sm text-gray-500 mb-1">Applied on: {app.appliedOn}</p>
              <p className="text-lg font-medium text-green-800">{app.name}</p>
              <p className="text-sm text-gray-600">{app.internship}</p>
            </div>

            {/* Status */}
            <div className="text-sm text-gray-700">{app.status}</div>
          </div>
        ))}
      </div>

      {/* Applicant Details Modal (if any applicant selected) */}
      {selectedApplicant && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              {selectedApplicant.name}
            </h2>
            <p><strong>Internship:</strong> {selectedApplicant.internship}</p>
            <p><strong>Email:</strong> {selectedApplicant.email}</p>
            <p><strong>Phone:</strong> {selectedApplicant.phone}</p>
            <p><strong>Details:</strong> {selectedApplicant.details}</p>

           {/* New Buttons */}
<div className="flex gap-4 mt-4">
  <a
    href={selectedApplicant.cvFile}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  >
    View CV
  </a>

  <a
    href={selectedApplicant.cvFile}
    download
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
  >
    Download CV
  </a>
</div>

       <SlidingSidebar
        setShowProfile={setShowProfile}
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
