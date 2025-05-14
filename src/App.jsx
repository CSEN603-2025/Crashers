import NavBar from "./navBar";
import "./index.css"; // Tailwind must be loaded here
import Company from "./company";
import LoginPage from "./login";
import StudentDashboard from "./studentDashboard";
import StudentProfile from "./studentProfile";
import Selection from "./selection";
import Recommendations from "./Recommendations";
import InternshipApplications from "./internshipApplications";


function App() {
  return (<div>
    <LoginPage/>
    <StudentDashboard/>
    <Recommendations/>
    <StudentProfile/> 
    <Selection/>
    <InternshipApplications/>
    </div>
  );
}

export default App;
