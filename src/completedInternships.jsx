import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SlidingSidebar from "./SlidingSidebar";
import { jsPDF } from "jspdf";

// Example courses based on selected major (You may want to adjust based on your actual course list)
const courses = {
  "Computer Science": ["CS101 - Intro to Programming", "CS102 - Data Structures", "CS201 - Algorithms"],
  "Information Systems": ["IS101 - Basics of IS", "IS102 - Database Management", "IS202 - Web Development"],
  "Software Engineering": ["SE101 - Software Design", "SE102 - Software Testing", "SE301 - Software Project Management"],
  "Cyber Security": ["CS101 - Introduction to Cyber Security", "CS202 - Network Security", "CS303 - Ethical Hacking"],
};

const CompletedInternships = () => {
  const [evaluation, setEvaluation] = useState({ comment: "", recommend: false });
  const [report, setReport] = useState({ title: "", introduction: "", body: "" });
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [major, setMajor] = useState(localStorage.getItem("selectedMajor"));
  const [completedInternship, setCompletedInternship] = useState({ company: "", role: "" });
  const [submittedEvaluation, setSubmittedEvaluation] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // Sliding sidebar hover effects
  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  const handleEvaluationChange = (e) => {
    setEvaluation({
      ...evaluation,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleReportChange = (e) => {
    setReport({ ...report, [e.target.name]: e.target.value });
  };

  const handleCourseSelection = (e) => {
    const selected = [...selectedCourses];
    if (e.target.checked) {
      selected.push(e.target.value);
    } else {
      const index = selected.indexOf(e.target.value);
      if (index !== -1) {
        selected.splice(index, 1);
      }
    }
    setSelectedCourses(selected);
  };

  const handleSubmitEvaluation = () => {
    setSubmittedEvaluation(true);
    // Save the evaluation data, possibly to the backend
  };

  const handleSubmitReport = () => {
    setSubmittedReport(true);
    // Save the report data, possibly to the backend
  };

  const handleDeleteEvaluation = () => {
    setEvaluation({ comment: "", recommend: false });
    setSubmittedEvaluation(false);
  };

  const handleDeleteReport = () => {
    setReport({ title: "", introduction: "", body: "" });
    setSelectedCourses([]);
    setSubmittedReport(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Completed Internship Report", 20, 20);
    doc.setFontSize(12);

    doc.text(`Company: ${completedInternship.company}`, 20, 30);
    doc.text(`Role: ${completedInternship.role}`, 20, 40);
    doc.text(`Title: ${report.title}`, 20, 50);
    doc.text(`Introduction: ${report.introduction}`, 20, 60);
    doc.text(`Body: ${report.body}`, 20, 70);

    doc.text(`Evaluation: ${evaluation.comment}`, 20, 90);
    doc.text(`Recommendation: ${evaluation.recommend ? "Yes" : "No"}`, 20, 100);

    doc.text(`Courses Used: ${selectedCourses.join(", ")}`, 20, 110);

    // Download PDF
    doc.save(`${completedInternship.company}_Internship_Report.pdf`);
  };

  return (
    <div className="relative w-screen min-h-screen bg-gray-100 pt-12">
      {/* Sliding Sidebar */}
      <div
        className="fixed right-0 top-0 h-full z-50 transition-all duration-300"
        style={{ width: sidebarWidth }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <SlidingSidebar
          sidebarWidth={sidebarWidth}
          isHovered={isHovered}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-5xl font-semibold text-green-700 mb-6 text-center">Completed Internship</h2>

        {/* Internship Info */}
        <div className="mb-6">
          <h3 className="text-3xl font-semibold text-green-700">{completedInternship.company}</h3>
          <p className="text-lg text-green-500">{completedInternship.role}</p>
        </div>

        {/* Evaluation */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-green-700 mb-4">Evaluate the Internship</h3>

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
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-4"
            disabled={submittedEvaluation}
          >
            {submittedEvaluation ? "Evaluation Submitted" : "Submit Evaluation"}
          </button>

          <button
            onClick={handleDeleteEvaluation}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-4"
          >
            Delete Evaluation
          </button>
        </div>

        {/* Internship Report */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-green-700 mb-4">Create Internship Report</h3>

          <input
            type="text"
            name="title"
            value={report.title}
            onChange={handleReportChange}
            placeholder="Report Title"
            className="border border-green-400 p-2 rounded w-full mb-4"
            disabled={submittedReport}
          />
          <textarea
            name="introduction"
            value={report.introduction}
            onChange={handleReportChange}
            placeholder="Introduction"
            className="border border-green-400 p-4 rounded w-full mb-4"
            rows="3"
            disabled={submittedReport}
          />
          <textarea
            name="body"
            value={report.body}
            onChange={handleReportChange}
            placeholder="Body of the Report"
            className="border border-green-400 p-4 rounded w-full mb-4"
            rows="5"
            disabled={submittedReport}
          />

          <div>
            <h4 className="text-lg font-semibold text-green-700 mb-2">Select Courses Used in Internship</h4>
            {courses[major]?.map((course, index) => (
              <label key={index} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  value={course}
                  onChange={handleCourseSelection}
                  className="mr-2"
                  disabled={submittedReport}
                />
                {course}
              </label>
            ))}
          </div>

          <button
            onClick={handleSubmitReport}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            disabled={submittedReport}
          >
            {submittedReport ? "Report Submitted" : "Submit Report"}
          </button>

          <button
            onClick={handleDeleteReport}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-4"
          >
            Delete Report
          </button>
        </div>

        <div className="mt-8">
          <button
            onClick={handleDownloadPDF}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={!submittedReport || !submittedEvaluation}
          >
            Download Report as PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletedInternships;
