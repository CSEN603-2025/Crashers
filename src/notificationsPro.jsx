import React, { useState } from "react";
import NavBar from "./navBar";
import SlidingSidebarPro from "./slidingBarPro";
import { useNavigate } from "react-router-dom";


const notificationsData = [
  {
    id: 1,
    sender: "SC",
    title: "React Live Workshop",
    date: "2025-05-13",
    isRead: false,
    type: "Live",
    details: {
      name: "React Live Workshop",
      description: "Build modern UIs with React.",
      speaker: "Sara Hossam - Frontend Lead at Meta",
      agenda: "Intro → Hooks → Live coding",
      start: "2025-05-13T15:00",
      end: "2025-05-13T17:00",
      type: "live",
      actionLabel: "Join Now",
      actionUrl: "/joinNow",
    },
  },
  {
    id: 4,
    sender: "MK",
    title: "New Message in React Live Workshop",
    date: "2025-05-13",
    isRead: false,
    type: "Message",
    details: {
      name: "React Live Workshop",
      content: "Is Anyone Recording this workshop?",
    },
  },
  {
    id: 2,
    sender: "SC",
    title: "Git & GitHub Basics",
    date: "2025-05-10",
    isRead: false,
    details: {
      name: "Git & GitHub Basics",
      description: "Version control essentials and GitHub collaboration.",
      speaker: "Mohamed Samir - DevOps Engineer",
      agenda: "Git init → commit → push/pull → PRs",
      type: "Recorded",
      actionLabel: "Watch Now",
      actionUrl: "/recorded",
    },
  },
  {
    id: 3,
    sender: "SC",
    title: "Cracking Tech Interviews",
    date: "2025-05-18",
    isRead: false,
    details: {
      name: "Cracking Tech Interviews",
      description: "Strategies to succeed in technical interviews.",
      speaker: "Nour ElDin - Senior Engineer at Google",
      agenda: "Resume tips → Whiteboard coding → Q&A",
      start: "2025-05-18T14:00",
      end: "2025-05-18T16:00",
      type: "Live",
      actionLabel: "Join Now",
      actionUrl: "/register/interview-workshop",
    },
  },
  {
    id: 5,
    sender: "Scad",
    title: "Incoming Call: Career Guidance",
    date: "2025-05-13",
    isRead: false,
    type: "Call",
    details: {
      name: "Incoming Video Call",
      description: "You have an incoming video call for Career Guidance.",
      showActions: true,
    },
  },
  {
  id: 6,
  sender: "Scad",
  title: "Appointment Accepted",
  date: "2025-05-13",
  isRead: false,
  type: "Appointment",
  details: {
    name: "SCAD Officer Appointment",
    description: "Your appointment has been accepted by the SCAD Officer.",
    officerStatus: "online", // You could change this dynamically in future
    showStatus: true,
  },
},
 {
    id: 7,
    sender: "Scad",
    title: "Scad Officer Left the Call",
    date: "2025-05-13",
    isRead: false,
    type: "CallUpdate",
    details: {
      name: "Video Call Ended",
      description: "The SCAD Officer has left the video call.",
      showAlert: true,
    },
  }

];


function NotificationsPro() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [selectedNotif, setSelectedNotif] = useState(null);
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

  const handleNotificationClick = (notif) => {
    setSelectedNotif(notif);
    markAsRead(notif.id);
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };
  const handleAcceptCall = (id) => {
  console.log(`Call accepted for notification ID ${id}`);
  alert("You accepted the call. Redirecting to the video call...");
  // Implement navigation or WebRTC logic here
};

const handleRejectCall = (id) => {
  setToastMessage("Video Call Rejected.");
  // You could optionally remove or mark it differently


  setTimeout(() => {
    setToastMessage("");
  }, 3000);
};
      const navigate = useNavigate();
      const [toastMessage, setToastMessage] = useState("");





  return (
  <div className="bg-gray-100 min-h-screen w-screen relative">
    <NavBar />

    <div className="flex pt-24">
      {/* LEFT: Notifications List */}
      <div className="ml-6 w-1/2 border-r border-gray-300">
        <h2 className="text-xl font-semibold px-6 mt-6 py-2 font-poppins">Notifications</h2>
        <div className="divide-y mt-4">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`flex items-center ${
                notif.isRead ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-200 cursor-pointer transition`}
              onClick={() => handleNotificationClick(notif)}
            >
              {/* Green unread indicator */}
              {!notif.isRead && (
                <div className="w-1.5 h-20 bg-green-600 rounded-l no-stretch" />
              )}
              <div className="flex-1 p-4 flex items-center gap-4">
                <div className="bg-green-600 text-white font-bold rounded-full w-10 h-10 flex items-center justify-center">
                  {notif.sender}
                </div>
                <div>
                  <div className="font-semibold">{notif.title}</div>
                  <div className="text-sm text-gray-500">{notif.date}</div>
                </div>
              </div>
              {!notif.isRead && (
                <span className="text-sm text-red-500 font-medium pr-4">
                  ● Unread
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Details Panel */}
      <div className="w-[72%] px-8 pt-4">
  {!selectedNotif ? (
    <div className="text-center text-gray-500 italic mt-10">
      Click on any notification to read it.
    </div>
  ) : (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">
          {selectedNotif.details?.name || selectedNotif.title}
        </h3>
        <button
          onClick={() => setSelectedNotif(null)}
          className="text-gray-500 hover:text-black hover:border-primary text-lg"
        >
          ✖
        </button>
      </div>

      {/* Always show the main message */}
      <p className="mb-2 text-gray-700">{selectedNotif.message}</p>

      {/* Optional fields if they exist */}
      {selectedNotif.details?.description && (
        <p className="mb-2 text-gray-700">
          {selectedNotif.details.description}
        </p>
      )}
      {selectedNotif.details?.speaker && (
        <p className="mb-1">
          <strong>Speaker:</strong> {selectedNotif.details.speaker}
        </p>
      )}
      {selectedNotif.details?.agenda && (
        <p className="mb-1">
          <strong>Agenda:</strong> {selectedNotif.details.agenda}
        </p>
      )}
      {selectedNotif.details?.type && (
        <p className="mb-1">
          <strong>Type:</strong> {selectedNotif.details.type}
        </p>
      )}
       {selectedNotif.details?.content && (
        <p className="mb-1">
          <strong>Mostafa Khaled:</strong> {selectedNotif.details.content}
        </p>
      )}
      {selectedNotif.details?.start && (
        <p className="mb-1">
          <strong>Start:</strong>{" "}
          {new Date(selectedNotif.details.start).toLocaleString()}
        </p>
      )}
      {selectedNotif.details?.end && (
        <p className="mb-4">
          <strong>End:</strong>{" "}
          {new Date(selectedNotif.details.end).toLocaleString()}
        </p>
      )}
{selectedNotif.type === "Appointment" && selectedNotif.details?.showStatus && (
  <div className="mt-4">
    <p>
      <strong>SCAD Officer Status:</strong>{" "}
      <span
        className={`font-semibold ${
          selectedNotif.details.officerStatus === "online"
            ? "text-green-600"
            : "text-gray-400"
        }`}
      >
        {selectedNotif.details.officerStatus === "online"
          ? "Online"
          : "Offline"}
      </span>
    </p>
  </div>
)}
   {/* Call Notification Buttons */}
{selectedNotif.type === "Call" && selectedNotif.details?.showActions ? (
  <div className="flex gap-4 mt-4">
    <button
      onClick={() => navigate("/videoCall")}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
    >
      Accept
    </button>
    <button
      onClick={() => handleRejectCall(selectedNotif.id)}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
    >
      Reject
    </button>
  </div>
) : selectedNotif.details?.actionUrl ? (
  <a
    href={selectedNotif.details.actionUrl}
    className="inline-block text-white bg-green-600 hover:bg-green-700 px-4 py-2 text-sm rounded-md mt-4"
  >
    {selectedNotif.details.actionLabel || "Open"}
  </a>
) : null}

    </div>
  )}
</div>

    </div>

    {/* Sidebar */}
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
}

export default NotificationsPro;
