import React, { useState } from "react";
import NavBar from "./navBar";
import SlidingSidebarPro from "./slidingBarPro";
import { useNavigate } from "react-router-dom";

const dummyAssessments = [
  {
    id: 1,
    title: "React Basics",
    description: "Covers hooks, props, and state.",
    questions: [
      {
        question: "What hook is used to manage state?",
        options: ["useEffect", "useState", "useContext", "useRef"],
        correct: "useState",
      },
      {
        question: "Props are used to:",
        options: ["Manage local state", "Pass data to components", "Render CSS", "Handle events"],
        correct: "Pass data to components",
      },
    ],
  },
  {
    id: 2,
    title: "JavaScript Fundamentals",
    description: "Covers ES6, async, and closures.",
    questions: [
      {
        question: "What does 'let' do in JavaScript?",
        options: ["Declares a variable", "Imports a module", "Defines a function", "Throws an error"],
        correct: "Declares a variable",
      },
      {
        question: "What is a closure?",
        options: [
          "A function inside an array",
          "A nested function with access to its outer scope",
          "A way to stop code execution",
          "A class method",
        ],
        correct: "A nested function with access to its outer scope",
      },
    ],
  },
  {
    id: 3,
    title: "UI/UX Principles",
    description: "Tests design thinking and usability.",
    questions: [
      {
        question: "Which is a core principle of UX?",
        options: ["Consistency", "Recursion", "Deployment", "Dependency Injection"],
        correct: "Consistency",
      },
      {
        question: "Good UI design includes:",
        options: ["Confusing layouts", "Clear navigation", "Redundant info", "Hidden buttons"],
        correct: "Clear navigation",
      },
    ],
  },
];

const OnlineAssessments = () => {
  const navigate = useNavigate();
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [postedToProfile, setPostedToProfile] = useState(false);

  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  const handleAnswerChange = (index, answer) => {
    setUserAnswers((prev) => ({ ...prev, [index]: answer }));
  };

  const handleCompleteAssessment = () => {
    const questions = selectedAssessment.questions;
    let correct = 0;
    questions.forEach((q, i) => {
      if (userAnswers[i] === q.correct) correct++;
    });
    const percentageScore = Math.round((correct / questions.length) * 100);
    setScore(percentageScore);
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
      <NavBar />
      <SlidingSidebarPro
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <div className="w-screen mt-24 min-h-screen bg-gray-100 px-6 py-12 text-gray-800 font-poppins">
        <h1 className="text-4xl text-green-800 text-center mb-10">Online Assessments</h1>

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
                  onClick={() => {
                    setSelectedAssessment(assess);
                    setUserAnswers({});
                    setScore(null);
                    setPostedToProfile(false);
                  }}
                  className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 text-sm"
                >
                  Take Assessment
                </button>
              </div>
            ))}
          </div>
        )}

        {selectedAssessment && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold text-green-700 mb-4">{selectedAssessment.title}</h2>

            {!score && (
              <div>
                {selectedAssessment.questions.map((q, index) => (
                  <div key={index} className="mb-4">
                    <p className="font-medium text-gray-800">{q.question}</p>
                    {q.options.map((option, i) => (
                      <label key={i} className="block">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={userAnswers[index] === option}
                          onChange={() => handleAnswerChange(index, option)}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                ))}
                <button
                  onClick={handleCompleteAssessment}
                  className="mt-6 bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
                >
                  Submit Assessment
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
                    className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                  >
                    Post Score to Profile
                  </button>
                ) : (
                  <p className="mt-4 text-green-700 font-medium">✅ Score posted to your profile.</p>
                )}

                <button
                  onClick={() => {
                    setSelectedAssessment(null);
                    setScore(null);
                    setUserAnswers({});
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