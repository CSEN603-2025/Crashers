import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Folder } from "lucide-react";  // Add Folder Icon for Internship Applications
import axios from "axios";
import SlidingSidebar from "./SlidingSidebar";

// Sample companies and internships data
const allCompanies = [
  { name: "Tech Innovators Inc.", industry: "Software" },
  { name: "Green Solutions Ltd.", industry: "Sustainability" },
  { name: "Creative Agency", industry: "Marketing" },
  { name: "HealthTech Innovations", industry: "Healthcare"},
  { name: "SecureNet Solutions", industry: "Cyber Security"},
  { name: "EcoTech Enterprises", industry: "Environmental Engineering"},
];

const availableInternships = [
  { id: 1, company: "Tech Innovators Inc.", role: "Software Developer", duration: "6 months", paid: true, salary: "$5000/month", skills: ["JavaScript", "React", "Node.js"], industry: "Software" },
  { id: 2, company: "Green Solutions Ltd.", role: "Sustainability Consultant", duration: "3 months", paid: true, salary: "$3000/month", skills: ["Sustainability", "Research", "Environmental Science"], industry: "Sustainability" },
  { id: 3, company: "Creative Agency", role: "Marketing Intern", duration: "4 months", paid: false, skills: ["SEO", "Content Creation", "Marketing"], industry: "Marketing" },
  { id: 4, company: "HealthTech Innovations", role: "Health Tech Developer", duration: "6 months", paid: true, salary: "$4500/month", skills: ["React", "Java", "Health Tech"], industry: "Healthcare" },
];

function StudentDashboard() {
  const navigate = useNavigate();
  const [jobInterests, setJobInterests] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load job interests from localStorage
  useEffect(() => {
    const interests = JSON.parse(localStorage.getItem("jobInterests")) || [];
    setJobInterests(interests);

    if (interests.length > 0) {
      const matchedCompanies = allCompanies.filter((company) =>
        interests.some((interest) =>
          company.industry.toLowerCase().includes(interest.toLowerCase())
        )
      );
      setFilteredCompanies(matchedCompanies);
    }
    setLoading(false);
  }, []);

  // Navigate to StudentProfile when profile icon is clicked
  const handleProfileClick = () => {
    navigate("/StudentProfile");
  };

  // Navigate to Internship Applications page when the applications icon is clicked
  const handleApplicationsClick = () => {
    navigate("/InternshipApplications");
  };

  // Navigate to Recommendations page
  const handleRecommendationsClick = (companyName) => {
    navigate(`/Recommendations/${companyName}`);
  };

  // Navigate to Selection page when an internship is selected
  const handleViewDetails = (internship) => {
    navigate("/Selection", { state: internship });
  };
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
    <div className="flex bg-gray-100 min-h-screen text-gray-800 font-sans relative">
      {/* Main Content */}
      <div className="flex-grow max-w-7xl mx-auto px-6 sm:px-8 py-16">
        {/* Available Companies Section */}
        <div className="mb-12">
          <h2 className="text-5xl font-semibold text-green-700 mb-6 text-center">Available Companies</h2>
          {loading ? (
            <p className="text-center text-green-600">Loading...</p>
          ) : jobInterests.length === 0 ? (
            <p className="text-center text-green-600">
              Please enter your job interests in your profile to view relevant companies.
            </p>
          ) : filteredCompanies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCompanies.map((company, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg border-l-8 border-green-600 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="p-8">
                    <h2 className="text-3xl font-semibold text-green-700">{company.name}</h2>
                    <p className="text-lg text-green-500 mt-1">{company.industry}</p>
  
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm text-green-600 font-medium">
                    
                      </span>
                      <button
                        onClick={() => handleRecommendationsClick(company.name)}
                        className="bg-green-600 text-white py-3 px-6 rounded-md text-sm font-semibold hover:bg-green-700 transition-all"
                      >
                        Recommendations
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-green-600">
              No companies found for your job interests. Try adding more interests in your profile.
            </p>
          )}
        </div>
  
        {/* Available Internships Section */}
        <div className="mb-12">
          <h2 className="text-5xl font-semibold text-green-700 mb-6 text-center">Available Internships</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableInternships.map((internship) => (
              <div
                key={internship.id}
                className="bg-white rounded-lg shadow-lg border-l-8 border-green-600 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="p-8">
                  <h3 className="text-3xl font-semibold text-green-700">{internship.company}</h3>
                  <p className="text-lg text-green-500">{internship.role}</p>
                  <button
                    onClick={() => handleViewDetails(internship)}
                    className="bg-green-600 text-white py-3 px-6 rounded-md text-sm font-semibold hover:bg-green-700 transition-all mt-4"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
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
}  

export default StudentDashboard;
