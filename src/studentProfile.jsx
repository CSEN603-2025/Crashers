import React, { useState, useEffect } from "react";
import SlidingSidebar from "./SlidingSidebar";
import myProfileImage from './assets/myProfile.png'; // Ensure the path is correct

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
  const [newActivity, setNewActivity] = useState("");
  const [activities, setActivities] = useState(JSON.parse(localStorage.getItem("activities")) || []);

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
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl border border-green-200">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center px-10 py-8 border-b border-green-100">
          <img src={myProfileImage} alt="Profile" className="text-green-800 text-5xl mb-2 w-16 h-16 rounded-full" />
          <h2 className="text-3xl font-bold text-green-800 mt-4">Student Profile</h2>
          <p className="text-green-600 text-sm font-poppins font-semibold mt-1">
            Your personalized internship and career hub
          </p>
        </div>

        {/* Profile Section */}
        <div className="px-10 py-6 border-b border-green-100 bg-green-50">
          <h3 className="font-bold font-poppins text-gray-900 mb-3">Personal Information</h3>

          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-2 px-4 py-2 rounded-md border border-green-300 w-full"
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-2 px-4 py-2 rounded-md border border-green-300 w-full"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="mt-2 px-4 py-2 rounded-md border border-green-300 w-full"
            />
          </div>
        </div>

        {/* Job Interests */}
        <div className="px-10 py-6 border-b border-green-100 bg-green-50">
          <h3 className="font-bold font-poppins text-gray-900 mb-3">Job Interests</h3>

          {jobInterests.length === 0 ? (
            <p className="text-gray-700">No job interests added yet.</p>
          ) : (
            <ul className="space-y-2">
              {jobInterests.map((interest, index) => (
                <li key={index} className="text-gray-700">
                  {interest}
                </li>
              ))}
            </ul>
          )}

          <input
            type="text"
            value={newJobInterest}
            onChange={(e) => setNewJobInterest(e.target.value)}
            placeholder="Add new job interest"
            className="mt-4 px-4 py-2 rounded-md border border-green-300 w-full"
          />
          <button
            onClick={handleAddJobInterest}
            className="bg-green-600 text-white font-poppins px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors mt-3"
          >
            Add Job Interest
          </button>
        </div>

        {/* College Activities */}
        <div className="px-10 py-6 border-b border-green-100 bg-green-50">
          <h3 className="font-bold font-poppins text-gray-900 mb-3">College Activities</h3>

          {activities.length === 0 ? (
            <p className="text-gray-700">No activities added yet.</p>
          ) : (
            <ul className="space-y-2">
              {activities.map((activity, index) => (
                <li key={index} className="text-gray-700">
                  {activity}
                </li>
              ))}
            </ul>
          )}

          <input
            type="text"
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            placeholder="Add new activity"
            className="mt-4 px-4 py-2 rounded-md border border-green-300 w-full"
          />
          <button
            onClick={handleAddActivity}
            className="bg-green-600 text-white font-poppins px-8 py-3 rounded-md font-semibold hover:bg-green-700 transition-colors mt-3"
          >
            Add Activity
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

export default StudentProfile;
