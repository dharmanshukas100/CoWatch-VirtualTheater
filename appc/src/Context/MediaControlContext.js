// MediaControlContext.js
import React, { createContext, useContext, useRef, useState } from 'react';

const MediaControlContext = createContext();

export const MediaControlProvider = ({ children }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const streamRef = useRef(null); // Reference for the media stream

  // Initialize the media stream
  const initMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream; // Save the stream reference
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) videoTrack.enabled = !isVideoOn;
      setIsVideoOn((prev) => !prev);
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) audioTrack.enabled = !isAudioOn;
      setIsAudioOn((prev) => !prev);
    }
  };

  return (
    <MediaControlContext.Provider
      value={{
        isVideoOn,
        isAudioOn,
        toggleVideo,
        toggleAudio,
        initMediaStream,
        streamRef, // Pass stream ref for components needing access
      }}
    >
      {children}
    </MediaControlContext.Provider>
  );
};

export const useMediaControl = () => useContext(MediaControlContext);
