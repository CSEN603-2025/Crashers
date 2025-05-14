import React, { useState } from "react";
import SlidingSidebar from "./slidingBar";
import NavBar from "./navBar";
import { Pencil, Trash2,Search } from "lucide-react";


const applicantsData = [
  {
    id: 1,
    name: "Sara Ali",
    internship: "Frontend Developer Internship",
    status: "current intern",
    email: "sara@example.com",
    phone: "0123456789",
    details: "Sara is proficient in React and TailwindCSS.",
    appliedOn: "2025-05-01",
    startDate: "2025-07-15",
    endDate: "2025-10-01"
  },
  {
    id: 2,
    name: "Ahmed Youssef",
    internship: "Backend Developer Internship",
    status: "current intern",
    email: "ahmed@example.com",
    phone: "0112233445",
    details: "Ahmed has experience with Node.js and MongoDB.",
    appliedOn: "2025-05-03",
    startDate: "2025-07-15",
    endDate: "2025-09-05"
  },
  {
    id: 3,
    name: "Malak Soliman",
    internship: "Marketing Internship",
    status: "current intern",
    email: "malak@example.com",
    phone: "0112233445",
    details: "Malak has experience with Social Media managing and PR.",
    appliedOn: "2025-08-13",
    startDate: "2025-08-15",
    endDate: "2025-09-15"
  },
];

export default function CurrentInterns() {
  const [selectedInternship, setSelectedInternship] = useState("All");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [allApplicants, setAllApplicants] = useState(applicantsData);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [evaluationText, setEvaluationText] = useState("");const [isEditingEvaluation, setIsEditingEvaluation] = useState(false);
  const internships = ["All", ...new Set(applicantsData.map((a) => a.internship))];
  const [evaluations, setEvaluations] = useState({});

  const updateStatus = (id, newStatus) => {
    const updated = allApplicants.map((app) =>
      app.id === id ? { ...app, status: newStatus } : app
    );
    setAllApplicants(updated);
    if (selectedApplicant?.id === id) {
      setSelectedApplicant({ ...selectedApplicant, status: newStatus });
    }
  };

  const filteredApplicants = allApplicants.filter((app) => {
    const internshipMatch = selectedInternship === "All" || app.internship === selectedInternship;
    const statusMatch = statusFilter === "All" || app.status === statusFilter;
    const searchMatch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.internship.toLowerCase().includes(searchTerm.toLowerCase());
    return internshipMatch && statusMatch && searchMatch;
  });
  const handleComplete = (id) => {
    updateStatus(id, "internship complete");
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
  const handleSaveEvaluation = () => {
  if (selectedApplicant) {
    setEvaluations({ ...evaluations, [selectedApplicant.id]: evaluationText });
    setShowEvaluationModal(false);
    setEvaluationText("");
    setIsEditingEvaluation(false);
  }
};

// Update handleEditEvaluation
const handleEditEvaluation = () => {
  setEvaluationText(evaluations[selectedApplicant.id] || "");
  setIsEditingEvaluation(true);
  setShowEvaluationModal(true);
};

// Delete evaluation
const handleDeleteEvaluation = () => {
  const updated = { ...evaluations };
  delete updated[selectedApplicant.id];
  setEvaluations(updated);
};

  return (
    <div className="bg-gray-100 w-screen mt-20 min-h-screen py-12 px-6">
      <NavBar />
      <div className="flex justify-between items-center mb-6 mt-6 mr-32">
        <h1 className="text-3xl text-primary font-semibold font-poppins text-left ml-12 mb-2">Interns:</h1>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by name or title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-10 py-2 rounded border border-green-300 shadow-sm"
          />

          <select
            value={selectedInternship}
            onChange={(e) => setSelectedInternship(e.target.value)}
            className="px-3 py-2 rounded border border-green-300 bg-white shadow-sm"
          >
            {internships.map((title) => (
              <option key={title}>{title}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded border border-green-300 bg-white shadow-sm"
          >
            <option value="All">All Statuses</option>
            <option value="current intern">Current Intern</option>
            <option value="internship complete">Internship Complete</option>
          </select>
        </div>
      </div>

      <div className="space-y-2 mr-32">
        {filteredApplicants.map((app) => (
          <div
            key={app.id}
            className="flex items-center justify-between p-4 bg-white rounded shadow-md hover:bg-green-100 transition"
          >
            <div onClick={() => setSelectedApplicant(app)} className="flex-grow flex items-center cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center text-lg font-bold mr-4">
                {app.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Start: {app.startDate} | End: {app.endDate}</p>
                <p className="text-lg font-medium text-green-800">{app.name}</p>
                <p className="text-sm text-gray-600">{app.internship}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-700">{app.status}</span>
              {app.status !== "internship complete" && (
                <button
                  onClick={() => handleComplete(app.id)}
                  className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                >
                  ✅ Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

{selectedApplicant && (
  <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full relative">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">{selectedApplicant.name}</h2>
      <p><strong>Internship:</strong> {selectedApplicant.internship}</p>
      <p><strong>Email:</strong> {selectedApplicant.email}</p>
      <p><strong>Phone:</strong> {selectedApplicant.phone}</p>
      <p><strong>Details:</strong> {selectedApplicant.details}</p>

      {selectedApplicant.status === "internship complete" && (
        <div className="mt-4">
                          <label className="font-bold text-sm text-primary font-poppins">Evaluation:</label>

          {evaluations[selectedApplicant.id] ? (
            <div className="bg-gray-100 p-3 rounded border mt-2">
              <p className="text-sm text-gray-700 whitespace-pre-line">{evaluations[selectedApplicant.id]}</p>
              <div className="flex justify-end mt-2 space-x-3">
                   <button
                  onClick={handleEditEvaluation}
                  className="text-blue-600 text-sm hover:underline hover:border-primary"
                  title="Edit"
                >
                <Pencil size={20} />
                </button>
                <button
                  onClick={handleDeleteEvaluation}
                  className="text-red-600 text-sm hover:underline hover:border-primary"
                  title="Delete"
                >
                <Trash2 size={20} />

                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setEvaluationText("");
                setShowEvaluationModal(true);
              }}
              className="mt-4 bg-green-600 text-white px-4 py-2 text-poppins text-semibold rounded hover:bg-green-700 transition"
            >
              Write an Evaluation
            </button>
          )}
        </div>
      )}

      <button
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 hover:border-primary"
        onClick={() => setSelectedApplicant(null)}
      >
        ✖
      </button>
    </div>
  </div>
)}

      {showEvaluationModal && (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
      <h3 className="text-xl font-semibold mb-3 text-green-700">
        {isEditingEvaluation ? "Edit" : "Write"} Evaluation for {selectedApplicant?.name}
      </h3>
      <textarea
        rows={5}
        className="w-full border rounded p-2 text-sm"
        placeholder="Write your evaluation here..."
        value={evaluationText}
        onChange={(e) => setEvaluationText(e.target.value)}
      />
      <div className="mt-4 flex justify-end gap-3">
        <button onClick={() => { setShowEvaluationModal(false); setEvaluationText(""); setIsEditingEvaluation(false); }} className="text-sm text-gray-600 hover:underline hover:border-primary">
          Cancel
        </button>
        <button onClick={handleSaveEvaluation} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:border-primary">
          Save
        </button>
      </div>
    </div>
  </div>
)}


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
