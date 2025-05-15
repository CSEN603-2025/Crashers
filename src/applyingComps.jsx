import React, { useState } from "react";
import SCADSidebar from "./scadSide";
import NavBar from "./navBar";

const dummyCompanies = [
  {
    id: 1,
    name: "Tech Innovators Inc.",
    industry: "Software",
    size: "51-200",
    email: "hr@techinnovators.com",
    description: "A leading software company specializing in AI and cloud solutions.",
    recommendations: 12,
    status: "pending",
  },
  {
    id: 2,
    name: "Green Solutions Ltd.",
    industry: "Sustainability",
    size: "11-50",
    email: "info@greenenergy.com",
    description: "Innovating green energy solutions for a sustainable future.",
    recommendations: 7,
    status: "pending",
  },
  {
    id: 3,
    name: "Creative Agency",
    industry: "Marketing",
    size: "200+",
    email: "contact@creativeagency.com",
    description: "A creative agency offering top-notch marketing solutions.",
    recommendations: 5,
    status: "pending",
  },
];

const CompanyApplications = () => {
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);
  const [companies, setCompanies] = useState(dummyCompanies);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setCompanies((prev) =>
      prev.map((company) =>
        company.id === id ? { ...company, status: newStatus } : company
      )
    );
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || company.industry === filter;
    return matchesSearch && matchesFilter;
  });

  const industries = ["all", ...new Set(companies.map((c) => c.industry))];

  return (
    <div className="flex">
             <NavBar/> 

      <SCADSidebar
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <div
        className="w-screen mt-24 bg-gray-100 min-h-screen text-gray-800 font-sans px-6 py-12 transition-all duration-300"
        
      >
        <h1 className="text-4xl font-poppins text-green-800 text-center mb-10">
          Incoming Company Applications
        </h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
          <input
            type="text"
            placeholder="Search by company name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full max-w-sm"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full max-w-sm"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind}>
                {ind === "all" ? "All Industries" : ind}
              </option>
            ))}
          </select>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-6 max-w-5xl ml-20 mx-auto">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg border-l-8 border-green-600 p-6 hover:shadow-xl transition duration-300"
            >
              {/* Left - Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-green-700">{company.name}</h2>
                <p className="text-sm text-green-500">{company.industry} | {company.size}</p>
                <p className="text-gray-700 mt-3">{company.description}</p>
                <p className="text-sm mt-2 text-gray-500"><strong>Email:</strong> {company.email}</p>
                <span className={`inline-block mt-3 text-xs px-2 py-1 rounded-full font-semibold ${
                  company.status === "accepted"
                    ? "bg-green-100 text-green-700"
                    : company.status === "rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {company.status}
                </span>
              </div>

              {/* Right - Actions */}
              <div className="flex flex-col gap-2 justify-center mt-6 md:mt-0 md:ml-6 w-full md:w-48">
                <button
                  onClick={() => setSelectedCompany(company)}
                  className="bg-gray-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-gray-700"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleStatusChange(company.id, "accepted")}
                  className="bg-green-700 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-green-800"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusChange(company.id, "rejected")}
                  className="bg-red-700 text-white py-2 px-4 rounded-md text-sm font-semibold hover:bg-red-800"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedCompany && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold text-green-800 mb-4">{selectedCompany.name}</h2>
              <p className="text-sm text-gray-600 mb-2"><strong>Industry:</strong> {selectedCompany.industry}</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Size:</strong> {selectedCompany.size}</p>
              <p className="text-sm text-gray-600 mb-2"><strong>Email:</strong> {selectedCompany.email}</p>
              <p className="text-sm text-gray-700 mt-4">{selectedCompany.description}</p>
              <div className="flex justify-end mt-6">
                 <a
    href={`/files/${selectedCompany.fileName || "CompanyInfo.pdf"}`}
    download
    className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800"
  >
    Download Company Documents
  </a>
                <button
                  onClick={() => setSelectedCompany(null)}
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

export default CompanyApplications;
