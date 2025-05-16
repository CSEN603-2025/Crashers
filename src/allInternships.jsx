import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RenderSidebar from "./whichSideBar";
import NavBar from "./navBar";

const allInternships = [
  {
    id: 1,
    company: "Tech Innovators Inc.",
    role: "Software Developer",
    duration: "6 months",
    paid: true,
    salary: "$5000/month",
    skills: ["JavaScript", "React", "Node.js"],
    industry: "Software",
    status: "current",
    startDate: new Date(2024, 5, 1),
    endDate: null,
  },
  {
    id: 2,
    company: "Green Solutions Ltd.",
    role: "Sustainability Consultant",
    duration: "3 months",
    paid: true,
    salary: "$3000/month",
    skills: ["Sustainability", "Research", "Environmental Science"],
    industry: "Sustainability",
    status: "completed",
    startDate: new Date(2023, 7, 15),
    endDate: new Date(2023, 10, 15),
  },
  {
    id: 3,
    company: "Engineering Dynamics",
    role: "Mechanical Engineer Intern",
    duration: "4 months",
    paid: true,
    salary: "$4000/month",
    skills: ["AutoCAD", "SolidWorks", "Mechanical Design"],
    industry: "Engineering",
    status: "current",
    startDate: new Date(2024, 2, 10),
    endDate: null,
  },
  {
    id: 4,
    company: "Quantum Software Solutions",
    role: "Full Stack Developer",
    duration: "6 months",
    paid: true,
    salary: "$5500/month",
    skills: ["Java", "Spring Boot", "React", "MySQL"],
    industry: "Software",
    status: "current",
    startDate: new Date(2024, 3, 1),
    endDate: null,
  },
];

const AllInternships = () => {
  // Lazy state initialization to avoid resetting on re-renders
  const [internships, setInternships] = useState(() => allInternships);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();
const [role, setRole] = useState(null); // State for role
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  // Sidebar state
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);

  // Handle sidebar hover
  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  const handleStatusChange = (id) => {
    const updatedInternships = internships.map((internship) =>
      internship.id === id && internship.status === "current"
        ? { ...internship, status: "completed" }
        : internship
    );
    setInternships(updatedInternships);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch =
      internship.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || internship.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (internship) => {
    if (internship.status === "completed") {
      navigate("/completedInternships/internshipsId", { state: internship });
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <NavBar />

      <div className="w-screen pt-24 pl-16">
        <h2 className="text-5xl font-semibold text-green-700 mb-12 text-center">
          All Internships
        </h2>

        <div className="flex justify-center gap-6 mb-8">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by job title or company"
            className="border border-green-400 p-2 rounded-md w-1/3"
          />
          <select
            value={statusFilter}
            onChange={handleFilterChange}
            className="border border-green-400 p-2 rounded-md w-1/3"
          >
            <option value="all">All Internships</option>
            <option value="current">Current Internships</option>
            <option value="completed">Completed Internships</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredInternships.map((internship) => (
            <div
              key={internship.id}
              className={`bg-white rounded-lg shadow-lg border-l-8 ${
                internship.status === "completed"
                  ? "border-green-600"
                  : "border-orange-600"
              } transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
            >
              <div className="p-8">
                <h3 className="text-3xl font-semibold text-green-700">
                  {internship.company}
                </h3>
                <p className="text-lg text-green-500 mt-1">{internship.role}</p>
                <p className="text-md text-gray-600 mt-1">
                  {internship.duration} •{" "}
                  {internship.paid ? internship.salary : "Unpaid"}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {internship.skills.join(", ")}
                </p>
                <p className="mt-2 text-sm font-semibold">
                  Status:{" "}
                  <span
                    className={`${
                      internship.status === "completed"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {internship.status}
                  </span>
                </p>

                <div className="flex mt-4 gap-4">
                  {internship.status === "current" && (
                    <button
                      onClick={() => handleStatusChange(internship.id)}
                      className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all"
                    >
                      Mark as Completed
                    </button>
                  )}
                  {internship.status === "completed" && (
                    <button
                      onClick={() => handleViewDetails(internship)}
                      className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all"
                    >
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     {role && (
        <RenderSidebar
          role={role}
          sidebarWidth={sidebarWidth}
          isHovered={isHovered}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
};

export default AllInternships;
