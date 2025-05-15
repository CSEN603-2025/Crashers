import React from 'react';
import ReactDOM from 'react-dom/client'; 
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
import LoginPage from "./login";
import StudentProfile from './studentProfile';
import Selection from './selection';
import NavBar from './navBar';
import InternshipApplications from './internshipApplications';
import AvailableCompanies from './availableCompanies';
import AllInternships from './allInternships';
import CompletedInternships from './completedInternships';
import ViewInternships from './viewInternships';
import CompaniesViewedMe from './profViews.jsx';
import OnlineAssessments from './onlineAssessments.jsx';
import NotificationsStudent from './notificationsStudent.jsx';
import MyReports from './myReports.jsx';
import VideoCall from './videoCall.jsx';
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="availableCompanies" element={<AvailableCompanies />} />
      <Route path="studentProfile" element={<StudentProfile />} /> 
            <Route path="studentHome" element={<StudentHome />} /> 

      <Route path="selection" element={<Selection />} /> 
      <Route path="/InternshipApplications" element={<InternshipApplications />} /> 
      <Route path="/allInternships" element={<AllInternships />} /> 
      <Route path="/completedInternships" element={<CompletedInternships />} /> 
      <Route path="/view-internships" element={<ViewInternships />} />
            <Route path="/myReports" element={<MyReports />} /> 
            <Route path="/" element={<LandingPage />} />
      <Route path="/profile" element={<CompanyProfile />} />
            <Route path="/workshopPro" element={<CareerWorkshopsPro />} />
            <Route path="/notificationsPro" element={<NotificationsPro />} />
      <Route path="/joinNow" element={<LiveWorkshop />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/recorded" element={<Recorded />} />
                        <Route path="/notificationsStudent" element={<NotificationsStudent />} />



      <Route path="/call" element={<Appointments />} />
     <Route path="/videoCall" element={<VideoCall />} />
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
        <Route path="/pro/profviews" element={<CompaniesViewedMe />} />
        <Route path="/pro/onlineassessments" element={<OnlineAssessments />} />


    </Routes>
  </BrowserRouter>

);
