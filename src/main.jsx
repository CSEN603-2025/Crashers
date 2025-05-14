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




// Import your App component

// Use React 18's new root API (ReactDOM.createRoot)
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <Routes>
            <Route path="/" element={<InternshipListings />} />
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
      </Routes>
  </BrowserRouter>

);
