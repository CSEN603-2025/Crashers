import React, { useState } from "react";
import SlidingSideBar from "./slidingBarPro";
import SlidingSidebarPro from "./slidingBarPro";
import NavBar from "./navBar";
const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2, 5);

const CareerWorkshopsPro = () => {
  const [workshops, setWorkshops] = useState([
    {
      id: generateId(),
      name: "Cracking Tech Interviews",
      description: "Strategies to succeed in technical interviews.",
      speaker: "Nour ElDin - Senior Engineer at Google",
      agenda: "Resume tips → Whiteboard coding → Q&A",
      start: "2025-05-18T14:00",
      end: "2025-05-18T16:00",
    },
     {
      id: generateId(),
      name: "Cracking Tech Interviews",
      description: "Strategies to succeed in technical interviews.",
      speaker: "Nour ElDin - Senior Engineer at Google",
      agenda: "Resume tips → Whiteboard coding → Q&A",
      start: "2025-05-18T14:00",
      end: "2025-05-18T16:00",
    },
  ]);
  const [toastMessage, setToastMessage] = useState("");


 const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);

   const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };


  const handleRegister = () => {
  setToastMessage("Registered successfully!");
    setTimeout(() => {
    setToastMessage("");
  }, 3000);
};


 

  return (
    <div className="flex">
        <NavBar/>
    <div className="w-screen min-h-screen bg-gray-100 px-6 py-12 text-gray-800 font-poppins"
     >
      <h1 className="mt-24 text-4xl font-poppins font-bold text-green-800 text-center mb-10">
        Online Career Workshops
      </h1>

      {/* Workshop Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
        {workshops.map((w) => (
          <div
            key={w.id}
            className="bg-white p-6 rounded-lg shadow border-l-8 border-green-600 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold text-green-700">{w.name}</h2>
            <p className="text-sm text-gray-500">{w.speaker}</p>
            <p className="mt-2 text-sm text-gray-700">{w.description}</p>
            <p className="text-xs text-gray-500 mt-1">
              <strong>Starts:</strong> {new Date(w.start).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              <strong>Ends:</strong> {new Date(w.end).toLocaleString()}
            </p>
            <p className="text-sm mt-2">
              <strong>Agenda:</strong><br /> {w.agenda}
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleRegister()}
                className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Register Now!
              </button>
            </div>
          </div>
        ))}
      </div>

      
    </div>
    <SlidingSidebarPro
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
       {toastMessage && (
  <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50">
    {toastMessage}
  </div>
)}
        </div>

  );
};

export default CareerWorkshopsPro;