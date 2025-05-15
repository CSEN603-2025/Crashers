import React, { useState } from "react";
import NavBar from "./navBar";
import SCADSidebar from "./scadSide";

const InternshipCyclesPage = () => {

  const [cycles, setCycles] = useState(() => {
    const stored = localStorage.getItem("internshipCycles");
    return stored
      ? JSON.parse(stored)
      : [
          {
            name: "Summer 2024",
            startDate: "2024-06-01",
            endDate: "2024-08-31",
            completedInternships: 28,
            companiesAdded: 10,
            current: false,
          },
          {
            name: "Spring 2024",
            startDate: "2024-03-01",
            endDate: "2024-05-31",
            completedInternships: 22,
            companiesAdded: 7,
            current: false,
          },
        ];
  });

  const [showForm, setShowForm] = useState(false);
  const [season, setSeason] = useState("Summer");
  const [year, setYear] = useState("2025");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [markAsCurrent, setMarkAsCurrent] = useState(false);

  const handleAddCycle = () => {
    const newCycle = {
      name: `${season} ${year}`,
      startDate,
      endDate,
      completedInternships: 0,
      companiesAdded: 0,
      current: markAsCurrent,
    };

    let updatedCycles = [newCycle, ...cycles];
    if (markAsCurrent) {
      updatedCycles = updatedCycles.map((c, idx) =>
        idx === 0 ? { ...c, current: true } : { ...c, current: false }
      );
    }

    setCycles(updatedCycles);
    localStorage.setItem("internshipCycles", JSON.stringify(updatedCycles));
    setShowForm(false);
    setStartDate("");
    setEndDate("");
    setMarkAsCurrent(false);
  };

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
  

  return (
    <div className="flex">
      <NavBar />
      <SCADSidebar
        sidebarWidth={sidebarWidth}
        isHovered={isHovered}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />

      <div
        className="w-screen bg-gray-100 min-h-screen pt-32 px-8 py-20"
        
      >
        <div className="flex items-center justify-between mb-10 max-w-4xl mx-auto">
          <h1 className="text-3xl font-poppins text-green-800 text-center w-full">
            Internship Cycles
          </h1>
        </div>

        <div className="max-w-4xl mx-auto pl-4">
          <button
            onClick={() => setShowForm(!showForm)}
            className="mb-6 bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
          >
            Add New Cycle
          </button>

          {showForm && (
            <div className="bg-white p-6 rounded shadow mb-8 border border-green-200">
              <div className="flex gap-4 mb-4">
                <select
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="border p-2 rounded w-1/2"
                >
                  <option>Winter</option>
                  <option>Spring</option>
                  <option>Summer</option>
                  <option>Fall</option>
                </select>
                <input
                  type="number"
                  placeholder="Year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="border p-2 rounded w-1/2"
                />
              </div>
              <div className="flex gap-4 mb-4">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border p-2 rounded w-1/2"
                />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border p-2 rounded w-1/2"
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={markAsCurrent}
                    onChange={(e) => setMarkAsCurrent(e.target.checked)}
                  />
                  Mark this cycle as current
                </label>
              </div>
              <button
                onClick={handleAddCycle}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Save Cycle
              </button>
            </div>
          )}
<div className=" pr-24 ">
          {cycles.map((cycle, index) => (
            <div
              key={index}
              className={`bg-white p-6  rounded-lg shadow border-l-8 mb-6 ${
                cycle.current ? "border-green-800 bg-green-50" : "border-green-600"
              }`}
            >
              <h2 className="text-xl font-bold text-center text-green-800 mb-2">
                {cycle.name}
                {cycle.current && (
                  <span className="ml-2 text-sm text-green-700 bg-green-200 px-2 py-1 rounded-full">
                    Current
                  </span>
                )}
              </h2>
              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Start Date:</strong> {cycle.startDate}
                </p>
                <p>
                  <strong>End Date:</strong> {cycle.endDate}
                </p>
                <p>
                  <strong>Completed Internships:</strong>{" "}
                  {cycle.completedInternships}
                </p>
                <p>
                  <strong>Companies Added:</strong> {cycle.companiesAdded}
                </p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipCyclesPage;
