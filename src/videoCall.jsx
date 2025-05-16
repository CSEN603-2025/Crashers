import React, { useEffect, useRef, useState } from "react";
import {
  VideoOff,
  Video,
  Mic,
  MicOff,
  ScreenShare,
  PhoneOff,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const VideoCall = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const screenStreamRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: true,
        });
        setStream(mediaStream);
        videoRef.current.srcObject = mediaStream;
      } catch (err) {
        console.error("Error accessing media devices.", err);
      }
    };

    getMedia();
  }, []);

  const toggleVideo = () => {
    const videoTrack = stream.getVideoTracks()[0];
    videoTrack.enabled = !videoTrack.enabled;
    setVideoEnabled(videoTrack.enabled);
  };

  const toggleAudio = () => {
    const audioTrack = stream.getAudioTracks()[0];
    audioTrack.enabled = !audioTrack.enabled;
    setAudioEnabled(audioTrack.enabled);
  };

  const handleScreenShare = async () => {
    if (!screenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        screenStreamRef.current = screenStream;
        const screenTrack = screenStream.getVideoTracks()[0];
        screenTrack.onended = () => stopScreenShare();
        videoRef.current.srcObject = screenStream;
        setScreenSharing(true);
      } catch (err) {
        console.error("Failed to share screen:", err);
      }
    } else {
      stopScreenShare();
    }
  };

  const stopScreenShare = () => {
    screenStreamRef.current?.getTracks().forEach((track) => track.stop());
    videoRef.current.srcObject = stream;
    setScreenSharing(false);
  };

  const leaveCall = () => {
    stream?.getTracks().forEach((track) => track.stop());
    videoRef.current.srcObject = null;
    alert("You have left the call.");

    const role = localStorage.getItem("role");
    if (role === "pro") {
      navigate("/availableCompanies");
    } else if (role === "scad") {
      navigate("/scad");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-black text-white relative">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full max-w-4xl rounded-lg border-4 border-white"
      />

      {/* Controls */}
      <div className="absolute bottom-10 flex gap-6 bg-white rounded-xl px-6 py-4 shadow-xl text-black">
        <button onClick={toggleVideo}>
          {videoEnabled ? (
            <Video className="w-8 h-8" />
          ) : (
            <VideoOff className="w-8 h-8 text-red-600" />
          )}
        </button>
        <button onClick={toggleAudio}>
          {audioEnabled ? (
            <Mic className="w-8 h-8" />
          ) : (
            <MicOff className="w-8 h-8 text-red-600" />
          )}
        </button>
        <button onClick={handleScreenShare}>
          <ScreenShare className="w-8 h-8" />
        </button>
        <button onClick={leaveCall}>
          <PhoneOff className="w-8 h-8 text-red-700" />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
