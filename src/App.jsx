import "./index.css"; // Tailwind CSS
import LandingPage from "./landing";
import Company from "./company";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";





function App() {
  return (<div>
    <Router>
      <Routes>
        <Route path="/company" element={<Company />} />
              <Route path="/" element={<LandingPage />} />

      </Routes>
    </Router>
    
    <Company/>
    </div>

  );
}

export default App;
