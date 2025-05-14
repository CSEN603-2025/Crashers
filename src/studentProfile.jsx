import React, { useState, useEffect } from "react";
import SlidingSidebar from "./SlidingSidebar";
import NavBar from "./navBar";
import myProfileImage from './assets/myProfile.png';
import { Edit2, Save } from "lucide-react";

const majors = ["Computer Science", "Information Systems", "Software Engineering", "Cyber Security"];
const semesters = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);

function StudentProfile() {
  // States for Sidebar
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);

  // Profile States with LocalStorage persistence
  const [selectedMajor, setSelectedMajor] = useState(localStorage.getItem("selectedMajor") || "");
  const [selectedSemester, setSelectedSemester] = useState(localStorage.getItem("selectedSemester") || "");
  const [jobInterests, setJobInterests] = useState(JSON.parse(localStorage.getItem("jobInterests")) || []);
  const [newJobInterest, setNewJobInterest] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [activities, setActivities] = useState(JSON.parse(localStorage.getItem("activities")) || []);
  const [newActivity, setNewActivity] = useState("");
  const [isEditable, setIsEditable] = useState(false);

  // Sidebar hover effects
  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  // Persist data to localStorage on change
  useEffect(() => {
    localStorage.setItem("selectedMajor", selectedMajor);
    localStorage.setItem("selectedSemester", selectedSemester);
    localStorage.setItem("jobInterests", JSON.stringify(jobInterests));
    localStorage.setItem("activities", JSON.stringify(activities));
    localStorage.setItem("email", email);
    localStorage.setItem("phone", phone);
    localStorage.setItem("name", name);
  }, [selectedMajor, selectedSemester, jobInterests, activities, email, phone, name]);

  // Toggle Edit Mode
  const toggleEditMode = () => {
    if (isEditable) {
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("phone", phone);
    }
    setIsEditable(!isEditable);
  };

  // Handle adding a new job interest
  const handleAddJobInterest = () => {
    if (newJobInterest.trim()) {
      const updatedInterests = [...jobInterests, newJobInterest];
      setJobInterests(updatedInterests);
      setNewJobInterest("");
    }
  };

  // Handle adding a new activity
  const handleAddActivity = () => {
    if (newActivity.trim()) {
      const updatedActivities = [...activities, newActivity];
      setActivities(updatedActivities);
      setNewActivity("");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex justify-center items-start pt-40 px-4 overflow-y-auto">
      <NavBar />
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl border border-green-200">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center px-10 py-8 border-b border-green-100">
          <img src={myProfileImage} alt="Profile" className="w-16 h-16 rounded-full" />
          <h2 className="text-3xl font-bold text-green-800 mt-4">Student Profile</h2>
          <p className="text-green-600 text-sm font-poppins font-semibold mt-1">
            Your personalized internship and career hub
          </p>
        </div>

        {/* Personal Information */}
        <div className="px-10 py-6 border-b border-green-100 bg-green-50">
          <div className="flex items-center justify-between">
            <h3 className="font-bold font-poppins text-gray-900 mb-3">Personal Information</h3>
            <button onClick={toggleEditMode} className="text-green-700 hover:text-green-900 transition-colors">
              {isEditable ? <Save size={20} /> : <Edit2 size={20} />}
            </button>
          </div>

          <div className="mb-4">
            <p><strong>Name:</strong> {isEditable ? <input value={name} onChange={(e) => setName(e.target.value)} className="border p-1 rounded-md w-full" /> : name}</p>
          </div>

          <div className="mb-4">
            <p><strong>Email:</strong> {isEditable ? <input value={email} onChange={(e) => setEmail(e.target.value)} className="border p-1 rounded-md w-full" /> : email}</p>
          </div>

          <div className="mb-4">
            <p><strong>Phone:</strong> {isEditable ? <input value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-1 rounded-md w-full" /> : phone}</p>
          </div>
        </div>

        {/* Job Interests */}
        <div className="px-10 py-6 border-b border-green-100 bg-green-50">
          <h3 className="font-bold font-poppins text-gray-900 mb-3">Job Interests</h3>

          <ul className="space-y-2">
            {jobInterests.map((interest, index) => (
              <li key={index} className="text-gray-700">
                {interest}
              </li>
            ))}
          </ul>

          <input
            type="text"
            value={newJobInterest}
            onChange={(e) => setNewJobInterest(e.target.value)}
            placeholder="Add new job interest"
            className="mt-4 px-4 py-2 rounded-md border border-green-300 w-full"
          />
          <button
            onClick={handleAddJobInterest}
            className="bg-green-600 text-white px-8 py-2 rounded-md mt-2 hover:bg-green-700 transition-colors"
          >
            Add Job Interest
          </button>
        </div>

        {/* College Activities */}
        <div className="px-10 py-6 border-b border-green-100 bg-green-50">
          <h3 className="font-bold font-poppins text-gray-900 mb-3">College Activities</h3>
          
          <ul className="space-y-2">
            {activities.map((activity, index) => (
              <li key={index} className="text-gray-700">
                {activity}
              </li>
            ))}
          </ul>

          <input
            type="text"
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            placeholder="Add new activity"
            className="mt-4 px-4 py-2 rounded-md border border-green-300 w-full"
          />
          <button
            onClick={handleAddActivity}
            className="bg-green-600 text-white px-8 py-2 rounded-md mt-2 hover:bg-green-700 transition-colors"
          >
            Add Activity
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
