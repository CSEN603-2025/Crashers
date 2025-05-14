import React, { useRef, useState } from "react";
import { Play, Pause, Square } from "lucide-react";
import workshopVideo from "./assets/Github.mp4";
import { useNavigate } from "react-router-dom";


function Recorded() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
     const [showModal, setShowModal] = useState(false);
       const navigate = useNavigate();

  

  const handlePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const handleStop = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
        setShowModal(true);

  };
  const goToCertificates = () => {
    setShowModal(false);
    navigate("/certificates");
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background Video */}
      <video
        ref={videoRef}
        src={workshopVideo}
        className="absolute top-0 left-0 w-full h-full object-cover"
        muted
        loop
      />

      {/* Bottom Controls */}
      <div className="absolute bottom-0 w-full bg-black bg-opacity-50 py-6 flex justify-center items-center gap-10 z-10">
        <button onClick={handlePlay} className="text-green-500 hover:scale-110 transition-transform">
          <Play size={50} />
        </button>
        <button onClick={handlePause} className="text-yellow-400 hover:scale-110 transition-transform">
          <Pause size={50} />
        </button>
        <button onClick={handleStop} className="text-red-500 hover:scale-110 transition-transform">
          <Square size={50} />
        </button>
      </div>
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
              <h3 className="text-lg font-semibold">Git & GitHub Basics pre-recorded workshop</h3>
              <p className="text-sm text-gray-600">Mohamed Samir - DevOps Engineer</p>
              <p className="text-sm text-gray-500">Date: 2025-05-13</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recorded;
