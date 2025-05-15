import React, { useState } from "react";
import NavBar from "./navBar";
import SlidingSidebarPro from "./slidingBarPro";
 import { useNavigate } from "react-router-dom";
 

const dummyAssessments = [
  { id: 1, title: "React Basics", description: "Covers hooks, props, and state." },
  { id: 2, title: "JavaScript Fundamentals", description: "Covers ES6, async, and closures." },
  { id: 3, title: "UI/UX Principles", description: "Tests design thinking and usability." },
];

const OnlineAssessments = () => {
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

  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [score, setScore] = useState(null);
  const [postedToProfile, setPostedToProfile] = useState(false);

  const handleCompleteAssessment = () => {
    const generatedScore = Math.floor(Math.random() * 51) + 50; // 50–100
    setScore(generatedScore);
  };

  const handlePostToProfile = () => {
  const existing = JSON.parse(localStorage.getItem("assessments")) || [];
  const updated = [...existing, { title: selectedAssessment.title, score }];
  localStorage.setItem("assessments", JSON.stringify(updated));

  setPostedToProfile(true);
  navigate("/pro/studentProfile");
 };

  return (
     <div className="flex">
      <NavBar/>
      <SlidingSidebarPro
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
    <div className="w-screen mt-24 min-h-screen bg-gray-100 px-6 py-12 text-gray-800 font-poppins">
      <h1 className="text-4xl text-green-800 text-center mb-10">Online Assessments</h1>

      {/* Assessment List */}
      {!selectedAssessment && (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyAssessments.map((assess) => (
            <div
              key={assess.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500"
            >
              <h2 className="text-xl font-semibold text-green-700">{assess.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{assess.description}</p>
              <button
                onClick={() => setSelectedAssessment(assess)}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 text-sm"
              >
                Take Assessment
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Assessment Taking & Score Display */}
      {selectedAssessment && (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">{selectedAssessment.title}</h2>

          {!score && (
            <div>
              <p className="mb-6 text-gray-700">{selectedAssessment.description}</p>
              <button
                onClick={handleCompleteAssessment}
                className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
              >
                Complete Assessment
              </button>
            </div>
          )}

          {score !== null && (
            <div>
              <p className="text-xl text-green-800 font-semibold">
                🎯 Your Score: <span className="text-2xl">{score}/100</span>
              </p>

              {!postedToProfile ? (
                <button
                  onClick={handlePostToProfile}
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                  Post Score to Profile
                </button>
              ) : (
                <p className="mt-4 text-green-700 font-medium">
                  ✅ Score posted to your profile.
                </p>
              )}

              <button
                onClick={() => {
                  setSelectedAssessment(null);
                  setScore(null);
                  setPostedToProfile(false);
                }}
                className="mt-4 ml-4 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
              >
                Back to List
              </button>
            </div>
          )}
        </div>
      )}
    </div>
        </div>

  );
};

export default OnlineAssessments;
