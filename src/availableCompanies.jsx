import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SlidingSidebar from './SlidingSidebar';
import NavBar from './navBar';

const AvailableCompanies = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // State for role
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState([
    {
        name: 'Google',
        industry: 'Software Engineering',
        internships: [
          {
            id: 1,
            title: 'Software Developer Intern',
            company: 'Google',
            duration: '6 months',
            industry: 'Software Engineering',
            skills: ['JavaScript', 'React', 'Node.js'],
            paid: true,
            salary: "$5000/month",
            description: 'Work on building scalable web applications and modern front-end technologies.',
          },
          {
            id: 2,
            title: 'Backend Developer Intern',
            company: 'Google',
            duration: '3 months',
            industry: 'Software Engineering',
            skills: ['Java', 'Spring Boot', 'MySQL'],
            paid: false,
            salary: "Unpaid",
            description: 'Assist in building backend services and optimizing database performance.',
          },
        ],
      },
      {
        name: 'Microsoft',
        industry: 'Computer Science',
        internships: [
          {
            id: 3,
            title: 'Cloud Solutions Intern',
            company: 'Microsoft',
            duration: '4 months',
            industry: 'Cloud Computing',
            skills: ['Azure', 'Cloud Security', 'Kubernetes'],
            paid: true,
            salary: "$4500/month",
            description: 'Learn to deploy and manage cloud services on Azure and Kubernetes.',
          },
        ],
      },
      {
        name: 'Amazon',
        industry: 'Computer Science',
        internships: [
          {
            id: 4,
            title: 'Data Analyst Intern',
            company: 'Amazon',
            duration: '5 months',
            industry: 'Data Science',
            skills: ['Python', 'Pandas', 'Data Visualization'],
            paid: true,
            salary: "$4000/month",
            description: 'Analyze datasets to derive business insights and support decision-making.',
          },
          {
            id: 5,
            title: 'Machine Learning Intern',
            company: 'Amazon',
            duration: '6 months',
            industry: 'Artificial Intelligence',
            skills: ['Python', 'TensorFlow', 'Machine Learning'],
            paid: true,
            salary: "$5500/month",
            description: 'Develop machine learning models for predictive analytics.',
          },
        ],
      },
      {
        name: 'IBM',
        industry: 'Computer Science',
        internships: [
          {
            id: 6,
            title: 'Cybersecurity Intern',
            company: 'IBM',
            duration: '4 months',
            industry: 'Cybersecurity',
            skills: ['Network Security', 'Ethical Hacking', 'SIEM Tools'],
            paid: false,
            salary: "Unpaid",
            description: 'Work on penetration testing and securing network infrastructures.',
          },
          {
            id: 7,
            title: 'Blockchain Developer Intern',
            company: 'IBM',
            duration: '3 months',
            industry: 'Blockchain',
            skills: ['Solidity', 'Smart Contracts', 'Ethereum'],
            paid: true,
            salary: "$4500/month",
            description: 'Develop smart contracts and decentralized applications on Ethereum.',
          },
        ],
      },
      {
        name: 'Meta',
        industry: 'Software Engineering',
        internships: [
          {
            id: 8,
            title: 'Front-End Developer Intern',
            company: 'Meta',
            duration: '6 months',
            industry: 'Software Engineering',
            skills: ['React', 'JavaScript', 'CSS'],
            paid: true,
            salary: "$6000/month",
            description: 'Develop and optimize front-end user experiences for Meta applications.',
          },
        ],
      },
      {
        name: 'Oracle',
        industry: 'Database Management',
        internships: [
          {
            id: 9,
            title: 'Database Administrator Intern',
            company: 'Oracle',
            duration: '4 months',
            industry: 'Database Management',
            skills: ['SQL', 'PL/SQL', 'Database Optimization'],
            paid: true,
            salary: "$5000/month",
            description: 'Assist in managing and optimizing large-scale database environments.',
          },
        ],
      },
    ]);

  // Get role from localStorage on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const handleViewInternships = (company) => {
    navigate('/view-internships', { state: company });
  };

  // Sidebar state
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

  // Filter companies based on searchTerm (case-insensitive)
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex">
      <NavBar />
      <div className="w-full pt-32 px-4">
        
        {/* Dynamic Title */}
        <h2 className="text-5xl font-semibold text-green-700 mb-6 text-center">
          {role === 'scad' ? 'Available Companies' : 'Suggested Companies'}
        </h2>

        {/* Search input */}
        <div className="max-w-4xl mx-auto mb-10">
          <input
            type="text"
            placeholder="Search by company name or industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="max-w-4xl mx-auto">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mb-6"
              >
                <div className="flex">
                  <div className="w-2 bg-green-600 rounded-l-lg"></div>
                  <div className="w-full p-6">
                    <h3 className="text-2xl font-semibold text-green-700 mb-2">
                      {company.name}
                    </h3>
                    <p className="text-gray-600 text-lg mb-4">{company.industry}</p>
                    <button
                      onClick={() => handleViewInternships(company)}
                      className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300"
                    >
                      View Internships
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No companies match your search.</p>
          )}
        </div>
      </div>

      {/* Sliding Sidebar */}
      <SlidingSidebar
        setShowProfile={() => {}}
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default AvailableCompanies;
