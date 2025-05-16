import internshipImage from "./Assets/intern.png";
import { useNavigate } from "react-router-dom";
import NavBar from "./navBar";

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800 font-poppins">
      <NavBar />

      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl w-full mx-auto px-6 py-16 bg-white rounded-lg shadow-md">
        {/* Left Section */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h1 className="text-5xl font-poppins text-green-700 leading-tight">
            OPPORTUNEE
          </h1>
          <h2 className="text-2xl font-poppins text-green-750">
            Where Ambition Meets Opportunity
          </h2>
          <p className="text-lg font-poppins text-gray-700">
            Connecting Students with Internships and Companies with Talent
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <button
              onClick={handleGetStarted}
              className="bg-green-600 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-green-800 transition-colors"
            >
             Company Registration
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="mt-10 md:mt-0 md:w-1/2">
          <img
            src={internshipImage}
            alt="Internship"
            className="w-full h-auto rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
