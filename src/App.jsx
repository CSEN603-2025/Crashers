import "./index.css"; // Tailwind CSS
import LandingPage from "./landing";
import Company from "./company";
import LoginPage from "./login";
import StudentDashboard from "./studentDashboard";
import StudentProfile from "./studentProfile";
import Selection from "./selection";
import InternshipApplications from "./internshipApplications";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";





function App() {
  return (<div>
    <LoginPage/>
    <StudentDashboard/>
    <StudentProfile/> 
    <Selection/>
    <InternshipApplications/>
    </div>

  );
}

export default App;
