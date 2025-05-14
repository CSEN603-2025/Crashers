import NavBar from "./navBar";
import "./index.css"; // Tailwind CSS
import LandingPage from "./landing";
import RegisterCompany from "./register"; // make sure this matches the component
import Company from "./company";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

    </Routes>
  );
}

export default App;
