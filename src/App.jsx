import { Routes, Route } from "react-router-dom";
import Login from "./login";
import StudentDashboard from "./studentDashboard";
import StudentProfile from "./studentProfile"; // Import StudentProfile

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* Login page is now default */}
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/studentprofile" element={<StudentProfile />} /> {/* Profile route */}
    </Routes>
  );
}

export default App;
