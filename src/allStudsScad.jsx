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
    status: "placed",
    company: "TechNova",
    details: "Currently interning at TechNova as a frontend developer.",
  },
  {
    id: 2,
    name: "Omar Youssef",
    email: "omar.youssef@scad.edu",
    major: "Business Administration",
    status: "pending",
    company: null,
    details: "Waiting for final confirmation from BrightLabs.",
  },
  {
    id: 3,
    name: "Laila Samir",
    email: "laila.samir@scad.edu",
    major: "Design",
    status: "not placed",
    company: null,
    details: "Actively applying to internships in UI/UX design.",
  },
];
  const [students, setStudents] = useState(dummyStudents);
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
<div
  className="w-screen min-h-screen bg-gray-100 px-6 py-12 pt-32 text-gray-800 font-poppins transition-all duration-300"
> 
      <NavBar />

      <h1 className="text-4xl font-poppins text-green-800 text-center mb-10">
        All Students
      </h1>

      {/* Filter */}
      <div className=" pr-24 flex mb-12">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded w-60"
        >
          <option value="all">All</option>
          <option value="placed">Placed</option>
          <option value="pending">Pending</option>
          <option value="not placed">Not Placed</option>
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
                  student.status === "placed"
                    ? "text-green-600"
                    : student.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {student.status}
              </span>
            </p>
            <p className="text-sm">
              <strong>Company:</strong> {student.company || "N/A"}
            </p>

            <button
        onClick={() => navigate(`/student/${student.id}`)}
    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700 transition"
        >
            View Profile
        </button>

          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              {selectedStudent.name}
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Email:</strong> {selectedStudent.email}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Major:</strong> {selectedStudent.major}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Status:</strong> {selectedStudent.status}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Company:</strong>{" "}
              {selectedStudent.company || "N/A"}
            </p>
            <p className="text-gray-700">{selectedStudent.details}</p>

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
