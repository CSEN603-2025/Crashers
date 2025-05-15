import React, { useState } from "react";
import SCADSidebar from "./scadSide";
import NavBar from "./navBar";
import { useNavigate } from "react-router-dom";

const AllStudents = () => {
  const navigate = useNavigate();

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

 const dummyStudents = [
  {
    id: 1,
    name: "Sara Ahmed",
    email: "sara.ahmed@scad.edu",
    major: "Computer Science",
    status: "Completed",
    company: "TechNova",
    details: "Completed two internships focused on frontend and full-stack development.",
    internships: [
      {
        company: "TechNova",
        role: "Frontend Intern",
        duration: "3 months",
        companyEvaluation: "Sara delivered high-quality code, was proactive, and communicated effectively with the team."
      },
      {
        company: "CodeCraft",
        role: "Full-Stack Intern",
        duration: "2 months",
        companyEvaluation: "She contributed to backend APIs and improved frontend performance. A reliable team player."
      }
    ],
  },
  {
    id: 2,
    name: "Omar Youssef",
    email: "omar.youssef@scad.edu",
    major: "Business Administration",
    status: "Completed",
    company: "BrightLabs",
    details: "Focused on digital marketing and campaign analysis.",
    internships: [
      {
        company: "BrightLabs",
        role: "Marketing Intern",
        duration: "2 months",
        companyEvaluation: "Omar managed Facebook ads and wrote analytical reports that influenced marketing strategy. Very detail-oriented."
      }
    ],
  },
  {
    id: 3,
    name: "Laila Samir",
    email: "laila.samir@scad.edu",
    major: "Design",
    status: "Completed",
    company: "UX Studio",
    details: "Completed internships in product and interaction design.",
    internships: [
      {
        company: "UX Studio",
        role: "UI/UX Intern",
        duration: "3 months",
        companyEvaluation: "Laila created engaging UI mockups and user flows. Her creative thinking stood out in all meetings."
      },
      {
        company: "Adwise",
        role: "Graphic Design Intern",
        duration: "1.5 months",
        companyEvaluation: "She handled branding assets for clients and was dependable under tight deadlines."
      }
    ],
  },
  {
    id: 4,
    name: "Mina Fawzy",
    email: "mina.fawzy@scad.edu",
    major: "Information Systems",
    status: "In progress",
    company: "Informatica Egypt",
    details: "Currently working on data pipeline documentation and system dashboards.",
    
  }
];



  const [students] = useState(dummyStudents);
  const [filter, setFilter] = useState("all");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students.filter((student) =>
    filter === "all" ? true : student.status === filter
  );

  return (
    <div>
      <SCADSidebar
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />

      <div className="w-screen min-h-screen bg-gray-100 px-6 py-12 pt-32 text-gray-800 font-poppins transition-all duration-300">
        <NavBar />

        <h1 className="text-4xl font-poppins text-green-800 text-center mb-10">
          All Students
        </h1>

        {/* Filter */}
        <div className="pr-24 flex mb-12">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded w-60"
          >
            <option value="all">All</option>
            <option value="Completed">Completed</option>
            <option value="In progress">In progress</option>
          </select>
        </div>

        {/* Student List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pr-24 gap-6 max-w-screen-xl mx-auto">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white p-6 rounded-lg shadow border-l-8 border-green-600 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-green-700">{student.name}</h2>
              <p className="text-sm text-gray-500">{student.email}</p>
              <p className="text-sm mt-1">
                <strong>Major:</strong> {student.major}
              </p>
              <p className="text-sm">
                <strong>Status:</strong>{" "}
                <span
                  className={`capitalize font-medium ${
                    student.status === "Completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {student.status}
                </span>
              </p>
              <p className="text-sm">
                <strong>Company:</strong> {student.company || "N/A"}
              </p>
           <div className="flex gap-2 mt-4 items-center">
  <button
    onClick={() => navigate(`/student/${student.id}`)}
    className="bg-green-600 text-white py-2 px-4 rounded-md text-sm hover:bg-green-700 transition whitespace-nowrap"
  >
    View Profile
  </button>

  <button
    onClick={() => setSelectedStudent(student)}
    className="bg-gray-500 text-white py-2 px-4 rounded-md text-sm hover:bg-gray-700 transition whitespace-nowrap"
  >
    View Evaluation
  </button>
</div>

            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedStudent && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold text-green-800 mb-4">{selectedStudent.name}</h2>
      <p className="text-sm text-gray-600 mb-1"><strong>Email:</strong> {selectedStudent.email}</p>
      <p className="text-sm text-gray-600 mb-1"><strong>Major:</strong> {selectedStudent.major}</p>
      <p className="text-sm text-gray-600 mb-1"><strong>Status:</strong> {selectedStudent.status}</p>

      {(selectedStudent.internships ?? []).length > 0 ? (
        selectedStudent.internships.map((intern, idx) => (
          <div key={idx} className="mt-4 border-t pt-4">
            <p className="text-sm text-gray-600"><strong>Company:</strong> {intern.company}</p>
            <p className="text-sm text-gray-600"><strong>Role:</strong> {intern.role} ({intern.duration})</p>
            <p className="text-sm text-gray-600 mt-2"><strong>Evaluation:</strong></p>
            <p className="text-gray-700 italic border-l-4 border-green-400 pl-4">
              {intern.companyEvaluation || "No evaluation provided."}
            </p>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-600 mt-4">No internship records available.</p>
      )}

      <div className="flex justify-end mt-6">
        <button
          onClick={() => setSelectedStudent(null)}
          className="bg-gray-600 text-white py-1 px-4 rounded hover:bg-gray-700"
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

export default AllStudents;
