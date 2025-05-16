import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import RenderSidebar from "./whichSideBar";
import NavBar from "./navBar";

const ViewInternships = () => {
  const { state: company } = useLocation();
  const navigate = useNavigate();

  const [role, setRole] = useState(null); // State for role
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const [sidebarWidth, setSidebarWidth] = React.useState("6rem");
  const [isHovered, setIsHovered] = React.useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [durationFilter, setDurationFilter] = useState("");
  const [paidFilter, setPaidFilter] = useState("");

  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  const matchesDuration = (internDuration, filterDuration) => {
    if (!filterDuration) return true;
    const durationInMonths = parseInt(internDuration);
    switch (filterDuration) {
      case "lessThan3":
        return durationInMonths < 3;
      case "3to6":
        return durationInMonths >= 3 && durationInMonths <= 6;
      case "moreThan6":
        return durationInMonths > 6;
      default:
        return true;
    }
  };

  const filteredInternships = company.internships.filter((intern) => {
    const searchMatch =
      intern.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      intern.company.toLowerCase().includes(searchTerm.toLowerCase());

    const industryMatch =
      industryFilter === "" || intern.industry === industryFilter;

    const durationMatch = matchesDuration(intern.duration, durationFilter);

    const paidMatch =
      paidFilter === ""
        ? true
        : paidFilter === "paid"
        ? intern.paid === true
        : intern.paid === false;

    return searchMatch && industryMatch && durationMatch && paidMatch;
  });

  const uniqueIndustries = [
    ...new Set(company.internships.map((intern) => intern.industry)),
  ];

  return (
    <div className="w-screen min-h-screen bg-gray-100 text-gray-800 font-sans">
      <NavBar />
      <div className="max-w-full pt-32 mx-auto py-16 px-6 sm:px-8 h-full">
        <h1 className="font-poppins text-4xl font-bold text-green-800 text-center mb-10">
          {company.name} - Available Internships
        </h1>

        {/* Search and Filter Controls */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          <input
            type="text"
            placeholder="Search by job title or company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />

          <div className="flex flex-wrap gap-4">
            {/* Industry Filter */}
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">All Industries</option>
              {uniqueIndustries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>

            {/* Duration Filter */}
            <select
              value={durationFilter}
              onChange={(e) => setDurationFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">All Durations</option>
              <option value="lessThan3">Less than 3 months</option>
              <option value="3to6">3 to 6 months</option>
              <option value="moreThan6">More than 6 months</option>
            </select>

            {/* Paid Filter */}
            <select
              value={paidFilter}
              onChange={(e) => setPaidFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <option value="">Paid & Unpaid</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        <div className="space-y-8">
          {filteredInternships.length > 0 ? (
            filteredInternships.map((intern, index) => (
              <div
                key={intern.id}
                className="bg-white rounded-lg shadow-lg border-l-8 border-green-600 transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
              >
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-semibold text-green-700">
                      {index + 1}. {intern.title}
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <p>
                      <strong>Duration:</strong> {intern.duration}
                    </p>
                    <p>
                      <strong>Paid:</strong> {intern.paid ? "Yes" : "No"}
                    </p>
                    <p>
                      <strong>Expected Salary:</strong>{" "}
                      {intern.salary || "Not specified"}
                    </p>
                    <p>
                      <strong>Skills Required:</strong>{" "}
                      {(intern.skills?.join(", ")) || "No skills specified"}
                    </p>
                  </div>

                  <div className="text-sm text-gray-700 mt-4">
                    <strong>Job Description:</strong>
                    <p className="mt-1">
                      {intern.description || "No description provided."}
                    </p>
                  </div>

                  {/* Apply Now Button - Only for students or pros */}
                  {(role === "student" || role === "pro") && (
                    <div className="flex justify-start mt-4">
                      <button
                        onClick={() =>
                          navigate("/selection", { state: intern })
                        }
                        className="bg-green-600 text-white font-bold font-poppins py-2 px-6 rounded-md shadow-md hover:bg-green-700 transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No internships match your criteria.
            </p>
          )}
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

export default ViewInternships;
