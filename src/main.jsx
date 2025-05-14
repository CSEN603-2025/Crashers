import React from 'react';
import ReactDOM from 'react-dom/client'; // Make sure you use the correct import for React 18+ and Vite
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx'; 
import InternshipListings from "./ownListings";
import Company from "./company";
import Applicants from "./applicants";
import CurrentInterns from './currentInterns.jsx';
import CompanyProfile from './companyProfile.jsx';
import StudentHome from './studentHome.jsx';
import CareerWorkshopsPro from './careerWorkPRo.jsx';
import NotificationsPro from './notificationsPro.jsx';
import LiveWorkshop from './liveWorkshop.jsx';
import Certificates from './certificates.jsx';
import Recorded from './recorded.jsx';
import Appointments from './appointments.jsx';
import RegisterCompany from "./register";
import CompanyApplications from "./applyingComps.jsx";
import SCADStatistics from './stats.jsx';
import AllStudents from './allStudsScad.jsx';
import AllReports from './allReportsScad.jsx';
import CareerWorkshops from './workshopsscad.jsx';
import FacultyReps from './facultyReports.jsx';
import StudentProfileScad from './Profilescadpov.jsx';
import SCADReportPage from "./statsReport.jsx";
import LandingPage from './landing.jsx';


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <Routes>
            <Route path="/" element={<LandingPage />} />
      <Route path="/profile" element={<CompanyProfile />} />
            <Route path="/workshopPro" element={<CareerWorkshopsPro />} />
            <Route path="/notificationsPro" element={<NotificationsPro />} />
      <Route path="/joinNow" element={<LiveWorkshop />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/recorded" element={<Recorded />} />


      <Route path="/call" element={<Appointments />} />

      <Route path="/company" element={<Company />} />
      <Route path="/currentInterns" element={<CurrentInterns />} />
      <Route path="/applicants" element={<Applicants />} />
      <Route path="/internships" element={<InternshipListings />} />
        <Route path="/register" element={<RegisterCompany />} />
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
