import React, { useState } from "react";
import live from "./Assets/liveWorkshop.png";
import { MessageCircle, NotebookPen, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";



function LiveWorkshop() {
  const [showChat, setShowChat] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [noteText, setNoteText] = useState("");
  const navigate = useNavigate();
   const [showModal, setShowModal] = useState(false);
   const handleDone = () => {
    setShowModal(true);
  };

  const goToCertificates = () => {
    setShowModal(false);
    navigate("/certificates");
  };

 

  const handleRating = (value) => setRating(value);
  const [chatMessages, setChatMessages] = useState([
  { sender: "Jana Nazeer", content: "Is the meeting lagging for anyone?", isMe: false },
  { sender: "Aya Walid", content: "No it's perfect, maybe check your signal.", isMe: false },
]);

const [newMessage, setNewMessage] = useState("");

const handleSend = () => {
  if (newMessage.trim() === "") return;
  setChatMessages([...chatMessages, { sender: "You", content: newMessage, isMe: true }]);
  setNewMessage("");
};

  return (
    <div
      className="relative w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${live})` }}
    >
      {/* Top Right Icons */}
      <div className="absolute top-6 right-6 flex gap-4">
        <button
          onClick={() => setShowChat(true)}
          className="bg-green-500 rounded-full p-2 shadow hover:bg-green-600"
        >
          <MessageCircle className="w-10 h-10 text-white" />
        </button>
        <button
          onClick={() => setShowNotes(true)}
          className="bg-green-500 rounded-full p-2 shadow hover:bg-green-600"
        >
          <NotebookPen className="w-10 h-10 text-white" />
        </button>
      </div>

      {/* Done Button */}
      <div className="absolute bottom-6 right-6">
        <button
          onClick={() => setShowRating(true)}
          className="bg-green-500 text-white font-poppins font-bold px-7 py-3 rounded-md shadow hover:bg-green-600"
        >
          Done
        </button>
      </div>

      {/* Chat Modal */}
     {showChat && (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
    <div className="bg-white p-4 rounded-lg w-96 h-[28rem] shadow-lg relative flex flex-col">
      <h2 className="text-xl font-semibold font-poppins mb-2">Live Chat</h2>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto space-y-2 p-2 border rounded mb-2 bg-gray-50">
        {chatMessages.map((msg, idx) => (
          <div key={idx} className={msg.isMe ? "text-right" : "text-left"}>
            <span className={`block text-sm font-semibold ${msg.isMe ? "text-green-700" : "text-gray-700"}`}>
              {msg.sender}:
            </span>
            <span className="text-sm text-gray-600">{msg.content}</span>
          </div>
        ))}
      </div>

      {/* Message input and send */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded px-2 py-1"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
        >
          Send
        </button>
      </div>

      {/* Close button */}
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
        onClick={() => setShowChat(false)}
      >
        ✖
      </button>
    </div>
  </div>
)}

 {/* Notes Modal */}
     {/* Notes Modal */}
{showNotes && (
  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
    <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
      <h2 className="text-xl font-semibold font-poppins mb-4">Take Notes</h2>
      <textarea
        className="w-full border p-2 rounded h-32"
        placeholder="Write your notes..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />      
    <button
        className=" text-white bg-gray-600 hover:bg-gray-700"
        onClick={() => setShowNotes(false)}
      >
        Done
      </button>
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-black"
        onClick={() => setShowNotes(false)}
      >
        ✖
      </button>
    </div>
  </div>
)}

      {/* Rating Modal */}
      {showRating && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg relative">
            <h2 className="text-xl font-semibold font-poppins mb-4">Rate this Workshop</h2>
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star
                  key={num}
                  onClick={() => handleRating(num)}
                  className={`w-6 h-6 cursor-pointer ${
                    num <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                  fill={num <= rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <textarea
              className="w-full border p-2 rounded h-24"
              placeholder="Leave feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                className="text-sm text-gray-600 hover:text-black"
                onClick={handleDone}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
       {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[28rem] relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
              onClick={goToCertificates}
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-2 text-center text-green-700">
              🎉 Congratulations!
            </h2>
            <p className="text-center text-gray-700 mb-4">
              You've earned a Career Workshop Certificate!
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold">React Live Workshop</h3>
              <p className="text-sm text-gray-600">Sara Hossam - Frontend Lead at Meta</p>
              <p className="text-sm text-gray-500">Date: 2025-05-13</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
}

export default LiveWorkshop;
