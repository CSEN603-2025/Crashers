import React, { useState, useEffect } from "react";
import SlidingSidebarPro from "./slidingBarPro";
import NavBar from "./navBar";
import myProfileImage from './assets/myProfile.png';
import { Edit2, Save } from "lucide-react";

const majors = ["Computer Science", "Information Systems", "Software Engineering", "Cyber Security"];
const semesters = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);

function ProStudentProfile() {
  // States for Sidebar
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);

  // Profile States with LocalStorage persistence
  const [selectedMajor, setSelectedMajor] = useState(localStorage.getItem("proSelectedMajor") || "");
  const [selectedSemester, setSelectedSemester] = useState(localStorage.getItem("proSelectedSemester") || "");
  const [jobInterests, setJobInterests] = useState(JSON.parse(localStorage.getItem("proJobInterests")) || []);
  const [newJobInterest, setNewJobInterest] = useState("");
  const [email, setEmail] = useState("jana@gmail.com");
  const [phone, setPhone] = useState("01154016603");
  const [name, setName] = useState("Jana Nazeer");
  const [activities, setActivities] = useState(JSON.parse(localStorage.getItem("proActivities")) || []);
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
    localStorage.setItem("proSelectedMajor", selectedMajor);
    localStorage.setItem("proSelectedSemester", selectedSemester);
    localStorage.setItem("proJobInterests", JSON.stringify(jobInterests));
    localStorage.setItem("proActivities", JSON.stringify(activities));
  }, [selectedMajor, selectedSemester, jobInterests, activities]);

  // Toggle Edit Mode
  const toggleEditMode = () => {
    setIsEditable(!isEditable);
  };

  // Add Job Interest
  const handleAddJobInterest = () => {
    if (newJobInterest.trim()) {
      setJobInterests([...jobInterests, newJobInterest.trim()]);
      setNewJobInterest("");
    }
  };

  // Add Activity
  const handleAddActivity = () => {
    if (newActivity.trim()) {
      setActivities([...activities, newActivity.trim()]);
      setNewActivity("");
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100 flex justify-center items-start pt-24 overflow-y-auto">
      <NavBar />
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl border border-green-200 mt-5">
        {/* Header */}
        <div className="flex flex-col items-center text-center px-10 py-8 border-b border-green-100">
          <img src={myProfileImage} alt="Profile" className="w-16 h-16 rounded-full" />
          <h2 className="text-3xl font-bold text-green-800 mt-4">Pro Student Profile</h2>
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

          <div className="mb-4">
            <p><strong>Major:</strong> {isEditable ? (
              <select value={selectedMajor} onChange={(e) => setSelectedMajor(e.target.value)} className="border p-1 rounded-md w-full">
                <option value="">Select Major</option>
                {majors.map((major) => <option key={major} value={major}>{major}</option>)}
              </select>
            ) : selectedMajor}
            </p>
          </div>

          <div className="mb-4">
            <p><strong>Semester:</strong> {isEditable ? (
              <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)} className="border p-1 rounded-md w-full">
                <option value="">Select Semester</option>
                {semesters.map((semester) => <option key={semester} value={semester}>{semester}</option>)}
              </select>
            ) : selectedSemester}
            </p>
          </div>
        </div>

        {/* Job Interests */}
        <div className="px-10 py-6 border-b border-green-100 bg-green-50">
          <h3 className="font-bold font-poppins text-gray-900 mb-3">Job Interests</h3>
          <ul className="space-y-2">
            {jobInterests.map((interest, idx) => (
              <li key={idx} className="text-gray-700">{interest}</li>
            ))}
          </ul>
          <div className="flex gap-4 mt-4">
            <input
              type="text"
              value={newJobInterest}
              onChange={(e) => setNewJobInterest(e.target.value)}
              placeholder="Add new job interest"
              className="flex-grow px-4 py-2 rounded-md border border-green-300"
            />
            <button
              onClick={handleAddJobInterest}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Add Job Interest
            </button>
          </div>
        </div>

        {/* College Activities */}
        <div className="px-10 py-6 bg-green-50">
          <h3 className="font-bold font-poppins text-gray-900 mb-3">College Activities</h3>
          <ul className="space-y-2">
            {activities.map((activity, idx) => (
              <li key={idx} className="text-gray-700">{activity}</li>
            ))}
          </ul>
          <div className="flex gap-4 mt-4">
            <input
              type="text"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="Add new activity"
              className="flex-grow px-4 py-2 rounded-md border border-green-300"
            />
            <button
              onClick={handleAddActivity}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Add Activity
            </button>
          </div>
        </div>
      </div>
      
      <SlidingSidebarPro
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    </div>
  );
}

export default ProStudentProfile;
