import React, { useState, useRef, useEffect } from "react";
import { Bell, BellDot } from "lucide-react";
import clsx from "clsx";
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
      officerStatus: "online",
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
  },
  {
    id: 8,
    sender: "Scad",
    title: "New Internship Cycle Started",
    date: "2025-06-01",
    isRead: false,
    type: "Cycle",
    details: {
      name: "Internship Cycle Notification",
      description: "A new internship cycle has just started. Check available opportunities now!",
    },
  },
  {
    id: 9,
    sender: "Scad",
    title: "Internship Report Flagged",
    date: "2025-05-13",
    isRead: false,
    type: "ReportStatus",
    details: {
      name: "Report Review Update",
      description: "Your internship report has been flagged for review.",
      status: "flagged",
    },
  },
  {
    id: 10,
    sender: "Scad",
    title: "Internship Report Accepted",
    date: "2025-05-13",
    isRead: false,
    type: "ReportStatus",
    details: {
      name: "Report Review Update",
      description: "Congratulations! Your internship report has been accepted.",
      status: "accepted",
    },
  },
];


export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const handleReject = (id) => {
  setToastMessage("Video Call Rejected.");
  // You could optionally remove or mark it differently


  setTimeout(() => {
    setToastMessage("");
  }, 3000);
};
  const [toastMessage, setToastMessage] = useState("");
    const navigate = useNavigate();
 


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center relative"
        onClick={() => setOpen((prev) => !prev)}
      >    <Bell className="fixed w-6 h-6 text-white z-10 " />

        {notificationsData.some((n) => !n.isRead) && (
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 p-4">
          <h4 className="text-lg font-semibold mb-2">Notifications</h4>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {notificationsData.length === 0 ? (
              <p className="text-sm text-gray-500">No notifications.</p>
            ) : (
              notificationsData.map((notif) => (
                <div
                  key={notif.id}
                  className={clsx(
                    "p-2 rounded-lg cursor-pointer hover:bg-gray-100",
                    !notif.isRead && "bg-gray-50 border-l-4 border-green-500"
                  )}
                >
                  <p className="font-medium">{notif.title}</p>
                  <p className="text-sm text-gray-600">{notif.details.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{notif.date}</p>

                  {notif.details?.actionUrl && notif.details?.actionLabel && (
                    <a
                      href={notif.details.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      {notif.details.actionLabel}
                    </a>
                  )}
                  {notif.details?.showActions && (
                    <div className="mt-2 flex space-x-2">
                      <button
                        onClick={() => navigate("/videoCall")}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(notif.id)}
                        className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    {toastMessage && (
  <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-2 rounded shadow-lg z-[9999]">
    {toastMessage}
  </div>
)}

    </div>
  );
}
