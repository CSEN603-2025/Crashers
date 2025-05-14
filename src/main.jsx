import React from 'react';
import ReactDOM from 'react-dom/client'; // Make sure you use the correct import for React 18+ and Vite
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'; // Import your App component
import RegisterCompany from "./register"; // make sure this matches the component
import Company from "./company";
import CompanyApplications from "./applyingComps.jsx";
import SCADStatistics from './stats.jsx';
import AllStudents from './allStudsScad.jsx';
import AllReports from './allReportsScad.jsx';
import CareerWorkshops from './workshopsscad.jsx';
import FacultyReps from './facultyReports.jsx';
import StudentProfileScad from './Profilescadpov.jsx';
import SCADReportPage from "./statsReport.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/register" element={<RegisterCompany />} />
      <Route path="/company" element={<Company />} />
      <Route path="/scad/companies" element={<CompanyApplications />} />
      <Route path="/scad/stats" element={<SCADStatistics />} />
      <Route path="/scad/allstudents" element={<AllStudents />} />
      <Route path="/scad/allreports" element={<AllReports />} />
      <Route path="/scad/workshops" element={<CareerWorkshops />} />
      <Route path="/faculty/reports" element={<FacultyReps />} />
      <Route path="/student/:id" element={<StudentProfileScad />} />
      <Route path="/scad/stats/report" element={<SCADReportPage />} />


    </Routes>
  </BrowserRouter>
);
