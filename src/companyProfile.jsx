import React,{useState} from "react";
import sylndr from "./Assets/Sylndr.png";
import { useNavigate } from "react-router-dom";
import NavBar from "./navBar";
import SlidingSidebar from "./slidingBar";



function CompanyProfile({  }) {
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
      
  
  return (
    <div className="min-h-screen w-screen bg-gray-100 flex justify-center items-start pt-40 px-4 overflow-y-auto">
      <NavBar/>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl border border-green-200">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center px-10 py-8 border-b border-green-100">
          <img
            src={sylndr}
            alt="Company Logo"
            className="w-28 h-28 rounded-full border-4 border-green-400 shadow-md"
          />
          <h2 className="text-3xl font-bold text-green-800 mt-4">Sylndr</h2>
          <p className="text-green-600 text-sm font-poppins font-semibold mt-1">
            Egypt’s Leading Used Cars Partner
          </p>
        </div>

        {/* Info Section with Borders */}
        <div className="grid md:grid-cols-2 gap-6 px-10 py-8 border-b border-green-100 bg-green-50">
          <div className="border-l-4 border-green-400 pl-4">
            <h3 className="font-bold font-poppins text-gray-900 mb-1">Email</h3>
            <p className="text-gray-700">sylndr@gmail.com</p>
          </div>
          <div className="border-l-4 border-green-400 pl-4">
            <h3 className="font-bold font-poppins text-gray-900 mb-1">Company Size</h3>
            <p className="text-gray-700">200–500 Employees</p>
          </div>
          <div className="border-l-4 border-green-400 pl-4">
            <h3 className="font-bold font-poppins text-gray-900 mb-1">Location</h3>
            <p className="text-gray-700">Cairo, Egypt</p>
          </div>
          <div className="border-l-4 border-green-400 pl-4">
            <h3 className="font-bold font-poppins text-gray-900 mb-1">Industry</h3>
            <p className="text-gray-700">Automotive / Tech</p>
          </div>
        </div>

        {/* Action Section */}
        <div className="flex flex-col items-center px-10 py-6">
          <button 
          onClick={() => navigate("/internships")}
          className="bg-green-600 text-white font-poppins px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors mb-3">
            View Internship Listings
          </button>
        </div>
      </div>
      {/* Sidebar injected here */}
      <SlidingSidebar
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
}

export default CompanyProfile;
