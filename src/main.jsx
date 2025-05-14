import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18+
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from "./login";
import StudentProfile from './studentProfile';
import Selection from './selection';
import NavBar from './navBar';
import InternshipApplications from './internshipApplications';
import AvailableCompanies from './availableCompanies';
import AllInternships from './allInternships';
import CompletedInternships from './completedInternships';
import ViewInternships from './ViewInternships';
import "./index.css";

// Use React 18's new root API (ReactDOM.createRoot)
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} /> 
      <Route path="availableCompanies" element={<AvailableCompanies />} />
      <Route path="studentProfile" element={<StudentProfile />} /> 
      <Route path="selection" element={<Selection />} /> 
      <Route path="/InternshipApplications" element={<InternshipApplications />} /> 
      <Route path="/allInternships" element={<AllInternships />} /> 
      <Route path="/completedInternships" element={<CompletedInternships />} /> 
      <Route path="/view-internships" element={<ViewInternships />} /> 

    </Routes>
  </BrowserRouter>
);
