import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SCADSidebar from "./scadSide";

const dummyStudents = [
  {
    id: 1,
    name: "Sara Ahmed",
    email: "sara.ahmed@scad.edu",
    major: "Computer Science",
    semester: "Semester 6",
    jobInterests: ["Frontend Developer", "UI Engineer"],
    internships: [
      { company: "TechNova", role: "Frontend Intern", duration: "3 months" },
    ],
    activities: ["Hackathon 2023", "Web Dev Club"],
  },
  {
    id: 2,
    name: "Omar Youssef",
    email: "omar.youssef@scad.edu",
    major: "Business Administration",
    semester: "Semester 5",
    jobInterests: ["Marketing Analyst"],
    internships: [
      { company: "BrightLabs", role: "Marketing Intern", duration: "2 months" },
    ],
    activities: ["Marketing Society"],
  },
  {
    id: 3,
    name: "Laila Samir",
    email: "laila.samir@scad.edu",
    major: "Design",
    semester: "Semester 7",
    jobInterests: ["UX Designer"],
    internships: [],
    activities: ["UI/UX Workshop"],
  },
];

function StudentProfileScad() {
  const { id } = useParams();
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

  const student = dummyStudents.find((s) => s.id === parseInt(id));

  if (!student) {
    return <div className="text-center mt-20 text-red-600">Student not found.</div>;
  }

  return (
    <div className="flex">
      <SCADSidebar
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <div
        className="min-h-screen w-screen bg-gray-100 flex justify-center items-start pt-40 px-4"
        style={{ paddingRight: sidebarWidth }}
      >
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl border border-green-200">
          {/* Header */}
          <div className="flex flex-col items-center text-center px-10 py-8 border-b border-green-100">
            <div className="w-28 h-28 rounded-full bg-green-200 text-green-800 flex items-center justify-center text-3xl font-bold shadow-md">
              {student.name.split(" ")[0][0]}
              {student.name.split(" ")[1][0]}
            </div>
            <h2 className="text-3xl font-bold text-green-800 mt-4">{student.name}</h2>
            <p className="text-green-600 text-sm font-poppins font-semibold mt-1">
              {student.major} - {student.semester}
            </p>
          </div>

          {/* Info */}
          <div className="grid md:grid-cols-2 gap-6 px-10 py-8 border-b border-green-100 bg-green-50">
            <div className="border-l-4 border-green-400 pl-4">
              <h3 className="font-bold font-poppins text-gray-900 mb-1">Email</h3>
              <p className="text-gray-700">{student.email}</p>
            </div>
            <div className="border-l-4 border-green-400 pl-4">
              <h3 className="font-bold font-poppins text-gray-900 mb-1">Major</h3>
              <p className="text-gray-700">{student.major}</p>
            </div>
            <div className="border-l-4 border-green-400 pl-4">
              <h3 className="font-bold font-poppins text-gray-900 mb-1">Semester</h3>
              <p className="text-gray-700">{student.semester}</p>
            </div>
          </div>

          {/* Job Interests */}
          <div className="px-10 py-6">
            <h3 className="text-xl font-semibold text-green-700 mb-3">Job Interests</h3>
            <ul className="list-disc pl-6 text-gray-800">
              {(student.jobInterests ?? []).map((interest, idx) => (
                <li key={idx}>{interest}</li>
              ))}
            </ul>
          </div>

          {/* Internships */}
          <div className="px-10 py-6 border-t border-green-100">
            <h3 className="text-xl font-semibold text-green-700 mb-3">Internships</h3>
            <ul className="list-disc pl-6 text-gray-800">
              {(student.internships ?? []).length > 0 ? (
                student.internships.map((intern, idx) => (
                  <li key={idx}>
                    {intern.company} – {intern.role} ({intern.duration})
                  </li>
                ))
              ) : (
                <li>No internships listed.</li>
              )}
            </ul>
          </div>

          {/* Activities */}
          <div className="px-10 py-6 border-t border-green-100">
            <h3 className="text-xl font-semibold text-green-700 mb-3">College Activities</h3>
            <ul className="list-disc pl-6 text-gray-800">
              {(student.activities ?? []).length > 0 ? (
                student.activities.map((activity, idx) => (
                  <li key={idx}>{activity}</li>
                ))
              ) : (
                <li>No activities listed.</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfileScad;
