import React from "react";
import {
  ShieldCheck,
  Search,
  Briefcase,
  Folder,
  NotebookPen,
  PhoneCall,
  Eye,
  BookOpenCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SlidingSidebarPro = ({
  setShowProfile,
  sidebarWidth,
  isHovered,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed top-24 right-0 bg-gray-700 border-l border-gray-300 shadow-lg transition-all duration-300 z-20"
      style={{
        width: sidebarWidth,
        height: "calc(100vh - 6rem)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex flex-col pr-10 items-start px-4 py-6 gap-4 overflow-y-auto"
        style={{ height: "100%" }}
      >
        {isHovered && (
          <span className="font-bold ml-4 text-sm font-poppins text-white">
            Menu
          </span>
        )}

        <SidebarButton
          onClick={() => navigate("/certificates")}
          icon={<ShieldCheck className="inline-block mr-2" />}
          label="Your Certificates"
          isHovered={isHovered}
        />

        <SidebarButton
          onClick={() => navigate("/AvailableCompanies")}
          icon={<Search className="inline-block mr-2" />}
          label="Discover Companies"
          isHovered={isHovered}
        />

        <SidebarButton
          onClick={() => navigate("/AllInternships")}
          icon={<Briefcase className="inline-block mr-2" />}
          label="My Internships"
          isHovered={isHovered}
        />

        <SidebarButton
          onClick={() => navigate("/InternshipApplications")}
          icon={<Folder className="inline-block mr-2" />}
          label="Internship Applications"
          isHovered={isHovered}
        />

        <SidebarButton
          onClick={() => navigate("/workshopPro")}
          icon={<NotebookPen className="inline-block mr-2" />}
          label="Online Workshops"
          isHovered={isHovered}
        />

        <SidebarButton
          onClick={() => navigate("/call")}
          icon={<PhoneCall className="inline-block mr-2" />}
          label="Your Appointments"
          isHovered={isHovered}
        />

        <SidebarButton
          onClick={() => navigate("/pro/profviews")}
          icon={<Eye className="inline-block mr-2" />}
          label="Profile Views"
          isHovered={isHovered}
        />

        <SidebarButton
          onClick={() => navigate("/pro/onlineassessments")}
          icon={<BookOpenCheck className="inline-block mr-2" />}
          label="Online Assessments"
          isHovered={isHovered}
        />
      </div>
    </div>
  );
};

const SidebarButton = ({ onClick, icon, label, isHovered }) => (
  <button
    onClick={onClick}
    className="text-left w-full bg-gray-700 text-white text-sm font-poppins font-medium hover:border-black hover:bg-gray-500 transition-all duration-300 py-2 px-4 rounded-md"
  >
    {icon}
    {isHovered && <span className="text-sm">{label}</span>}
  </button>
);

export default SlidingSidebarPro;
