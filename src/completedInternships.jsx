import React, { useState, useEffect } from "react";
import RenderSidebar from "./whichSideBar";
import NavBar from "./navBar"; // Added NavBar import
import { useLocation } from "react-router-dom";

const CompletedInternships = () => {
  const [role, setRole] = useState(null); // State for role
    useEffect(() => {
      const storedRole = localStorage.getItem('role');
      setRole(storedRole);
    }, []);
  const { state: internship } = useLocation(); // Get internship details from navigation state
  const [evaluation, setEvaluation] = useState({ comment: "", recommend: false });
  const [submittedEvaluation, setSubmittedEvaluation] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);

  // Generate a unique key for each internship
  const internshipId = `evaluation_${internship.id}`;

  // Load evaluation data from localStorage on mount
  useEffect(() => {
    const storedEvaluation = JSON.parse(localStorage.getItem(internshipId));
    if (storedEvaluation) {
      setEvaluation(storedEvaluation);
      setSubmittedEvaluation(true);
    }
  }, [internshipId]);

  // Sliding sidebar hover effects
  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  // Handle changes in the evaluation form
  const handleEvaluationChange = (e) => {
    setEvaluation({
      ...evaluation,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  // Handle submission of the evaluation and save it to localStorage
  const handleSubmitEvaluation = () => {
    if (evaluation.comment.trim() === "") {
      alert("Comment cannot be empty.");
      return;
    }
    localStorage.setItem(internshipId, JSON.stringify(evaluation));
    setSubmittedEvaluation(true);
    alert("Evaluation submitted successfully. You can only submit once.");
  };

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content Wrapper */}
      <div className="flex w-full h-full mt-24"> {/* Added margin to push below Navbar */}
        
        {/* Main Content */}
        <div className="flex-grow p-10 overflow-y-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
            <h2 className="text-5xl font-semibold text-green-700 mb-6 text-center">
              {internship.company} - Internship Evaluation
            </h2>

            {/* Internship Details */}
            <div className="mb-8">
              <p><strong>Role:</strong> {internship.role}</p>
              <p><strong>Duration:</strong> {internship.duration}</p>
              <p><strong>Industry:</strong> {internship.industry}</p>
              <p><strong>Paid:</strong> {internship.paid ? "Yes" : "No"}</p>
              <p><strong>Salary:</strong> {internship.salary}</p>
            </div>

            {/* Evaluation Form */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-green-700 mb-4">
                Evaluate the Internship
              </h3>

              <textarea
                name="comment"
                value={evaluation.comment}
                onChange={handleEvaluationChange}
                placeholder="Write your evaluation here..."
                className="border border-green-400 p-4 rounded w-full mb-4"
                rows="5"
                disabled={submittedEvaluation}
              />
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="recommend"
                  checked={evaluation.recommend}
                  onChange={handleEvaluationChange}
                  className="mr-2"
                  disabled={submittedEvaluation}
                />
                I recommend this internship to other students
              </label>

              <button
                onClick={handleSubmitEvaluation}
                className={`px-4 py-2 rounded mb-4 transition-all ${
                  submittedEvaluation
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
                disabled={submittedEvaluation}
              >
                {submittedEvaluation ? "Evaluation Submitted" : "Submit Evaluation"}
              </button>

              {submittedEvaluation && (
                <p className="text-sm text-gray-500">
                  * You have already submitted your evaluation for this internship.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sliding Sidebar */}
         {role && (
        <RenderSidebar
          role={role}
          sidebarWidth={sidebarWidth}
          isHovered={isHovered}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      )}
      </div>
    </div>
  );
};

export default CompletedInternships;
