import React, { useState, useEffect } from "react";
import { Video, CheckCircle, XCircle, CalendarPlus, X } from "lucide-react";
import NavBar from "./navBar";
import RenderSidebar from "./whichSideBar";

const initialAppointments = [
  {
    id: 1,
    type: "Career Guidance",
    date: "2025-05-20",
    time: "14:00",
    status: "pending",
  },
  {
    id: 2,
    type: "Report Clarification",
    date: "2025-05-22",
    time: "11:00",
    status: "pending",
  },
];

function Appointments() {
   const [role, setRole] = useState(null); // State for role
        useEffect(() => {
          const storedRole = localStorage.getItem('role');
          setRole(storedRole);
        }, []);
  const [appointments, setAppointments] = useState(initialAppointments);
  const [sidebarWidth, setSidebarWidth] = useState("6rem");
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [purpose, setPurpose] = useState("Career Guidance");
  const [toastVisible, setToastVisible] = useState(false);

  const handleMouseEnter = () => {
    setSidebarWidth("16rem");
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setSidebarWidth("6rem");
    setIsHovered(false);
  };

  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  const handleSubmit = () => {
    if (newDate && purpose) {
      const newAppointment = {
        id: appointments.length + 1,
        type: purpose,
        date: newDate,
        time: "TBD",
        status: "pending",
      };
      setAppointments([...appointments, newAppointment]);
      setShowModal(false);
      setNewDate("");
      setPurpose("Career Guidance");
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen w-screen relative">
      <NavBar />
      <h1 className="text-3xl text-center font-bold font-poppins text-green-800 mb-6 mt-24">
        Appointments
      </h1>

      {/* Request Button */}
      <div className="text-right mr-24 mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-gray-500 border-2 border-white text-white font-poppins px-6 py-3 rounded-lg hover:border-green-600 inline-flex items-center gap-2"
        >
          <CalendarPlus className="w-6 h-6" />
          Request a Video Call Appointment
        </button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4 mr-24">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white p-4 rounded shadow-md flex justify-between items-center border-l-4 border-green-600"
          >
            <div>
              <h2 className="text-lg font-semibold">{appt.type}</h2>
              <p className="text-sm text-gray-600">
                {appt.date} at {appt.time}
              </p>
              <p
                className={`mt-1 text-sm ${
                  appt.status === "accepted"
                    ? "text-green-600"
                    : appt.status === "rejected"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                Status: {appt.status}
              </p>
            </div>
            {appt.status === "pending" && (
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(appt.id, "accepted")}
                  className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                >
                  <CheckCircle />
                </button>
                <button
                  onClick={() => updateStatus(appt.id, "rejected")}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                >
                  <XCircle />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[400px] relative shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <X />
            </button>
            <h2 className="text-xl font-bold mb-4">Appointment Details</h2>

            <label className="block text-sm mb-1">Select Date:</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />

            <label className="block text-sm mb-1">Purpose:</label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="Career Guidance">Career Guidance</option>
              <option value="Report Clarification">Report Clarification</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastVisible && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50">
          Appointment requested successfully!
        </div>
      )}

     {role && (
        <RenderSidebar
          role={role}
          sidebarWidth={sidebarWidth}
          isHovered={isHovered}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
}

export default Appointments;
