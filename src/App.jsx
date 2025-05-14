import NavBar from "./navBar";
import "./index.css"; // Tailwind must be loaded here
import Company from "./company";
import InternshipListings from "./ownListings";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";





function App() {
  return (<div>
    <Router>
      <Routes>
         <Route path="/" element={<Company />} />
        <Route path="/company" element={<Company />} />
      </Routes>
    </Router>
    
    <Company/>
    </div>
  );
}

export default App;
