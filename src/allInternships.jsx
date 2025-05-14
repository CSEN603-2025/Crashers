import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import SlidingSidebar from "./SlidingSidebar";

// Example data for internships
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
    status: "current", // "current" or "completed"
    startDate: new Date(2024, 5, 1), // June 1, 2024
    endDate: null, // ongoing
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
    startDate: new Date(2023, 7, 15), // August 15, 2023
    endDate: new Date(2023, 10, 15), // November 15, 2023
  },
  {
    id: 3,
    company: "Creative Agency",
    role: "Marketing Intern",
    duration: "4 months",
    paid: false,
    salary: "Unpaid",
    skills: ["SEO", "Content Creation", "Marketing"],
    industry: "Marketing",
    status: "current",
    startDate: new Date(2024, 0, 10), // January 10, 2024
    endDate: null, // ongoing
  },
  {
    id: 4,
    company: "HealthTech Innovations",
    role: "Health Tech Developer",
    duration: "6 months",
    paid: true,
    salary: "$4500/month",
    skills: ["React", "Java", "Health Tech"],
    industry: "Healthcare",
    status: "completed",
    startDate: new Date(2022, 3, 1), // April 1, 2022
    endDate: new Date(2022, 8, 1), // September 1, 2022
  },
];

const AllInternships = () => {
  const [statusFilter, setStatusFilter] = useState("completed"); // Default to "completed"
  const [searchQuery, setSearchQuery] = useState(""); // To search by job title or company name
  const [filteredInternships, setFilteredInternships] = useState(allInternships); // To store filtered internships
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Handle the change in status filter
  const handleStatusChange = (e) => {
    const status = e.target.value;
    setStatusFilter(status);

    // Filter internships based on status and search query
    filterInternships(status, searchQuery);
  };

  // Handle the change in search query
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter internships based on status and search query
    filterInternships(statusFilter, query);
  };

  // Filter internships by status and search query
  const filterInternships = (status, query) => {
    let filtered = allInternships.filter(
      (internship) => internship.status === status
    );

    if (query) {
      filtered = filtered.filter(
        (internship) =>
          internship.company.toLowerCase().includes(query.toLowerCase()) ||
          internship.role.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredInternships(filtered);
  };

  // Navigate to details page
  const handleViewDetails = (internship) => {
    navigate("/completedInternships", { state: internship });
  };

  // Handle mouse hover events for sliding sidebar
  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 pt-12">
      <h2 className="text-5xl font-semibold text-green-700 mb-12 text-center">
        All Internships
      </h2>

      {/* Flex container for Search Bar and Status Filter */}
      <div className="flex justify-center gap-6 mb-8">
        {/* Search Bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by job title or company"
          className="border border-green-400 p-2 rounded-md w-1/3"
        />

        {/* Status Filter Dropdown */}
        <select
          value={statusFilter}
          onChange={handleStatusChange}
          className="border border-green-400 p-2 rounded-md w-1/3"
        >
          <option value="completed">Completed Internships</option>
          <option value="current">Current Internships</option>
        </select>
      </div>

      {/* Internships List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filteredInternships.map((internship) => (
          <div
            key={internship.id}
            className="bg-white rounded-lg shadow-lg border-l-8 border-green-600 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <div className="p-8">
              <h3 className="text-3xl font-semibold text-green-700">{internship.company}</h3>
              <p className="text-lg text-green-500 mt-1">{internship.role}</p>
              <p className="text-md text-gray-600 mt-1">{internship.duration} • {internship.paid ? internship.salary : "Unpaid"}</p>
              <p className="text-sm text-gray-500 mt-1">{internship.skills.join(", ")}</p>
              <button
                onClick={() => handleViewDetails(internship)}
                disabled={internship.status !== "completed"} // Only allow "completed" internships to be selected
                className={`bg-green-600 text-white py-3 px-6 rounded-md text-sm font-semibold hover:bg-green-700 transition-all mt-4 ${
                  internship.status !== "completed" ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Sliding Sidebar */}
      <SlidingSidebar
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default AllInternships;
