import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../home.css';
import lightLogo from '../assets/white.png';
import Roomcreatedpop from './Roomcreatedpop';

const TopBar = ({ currentRoom }) => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  // Extract roomId from the current browser location
  const currentPath = window.location.pathname;
  const roomId = currentPath.split('/').pop();
  const roomLink = `${window.location.origin}${currentPath}`; // Full URL for sharing

  const handleInviteClick = () => {
    setShowPopup(true); // Show the popup
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  const handleLeaveRoom = () => {
    // Clear stored chats for this user

    // Example of how to get media stream when the user joins the room
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    // Store the stream globally or in a ref
    window.userStream = stream;

    // Assuming you have a video element to display the video
    const videoElement = document.getElementById('user-video');
    videoElement.srcObject = stream;

    // If you're using WebRTC, attach this stream to your peer connection
    if (window.peerConnection) {
      stream.getTracks().forEach(track => window.peerConnection.addTrack(track, stream));
    }
  })
  .catch(err => console.error('Error accessing media devices: ', err));



    localStorage.removeItem(`chats-${roomId}`);

    // 1. Stop the user's video and audio tracks
    if (window.userStream) {
      const tracks = window.userStream.getTracks();
      tracks.forEach(track => track.stop());  // Stop each track (audio and video)
    }

    // 2. Close the WebRTC peer connection
    if (window.peerConnection) {
      window.peerConnection.close(); // Close the WebRTC connection
      window.peerConnection = null; // Clear reference to peer connection
    }

    // 3. Disconnect the socket connection
    if (window.socket) {
      window.socket.emit('user-left', { roomId, userId: window.currentUserId });
      window.socket.disconnect(); // Disconnect the socket
    }

    // 4. Navigate the user back to the dashboard
    navigate('/dashboard');
  };

  return (
    <div className="top-bar">
      <div className='siteLogo'>
        <img src={lightLogo} alt="COWATCH" />
      </div>
      <div>
        <h3 className='room-name Inter'>{currentRoom ? currentRoom.roomName : "Room"}</h3>
      </div>
      <div className="top-buttons">
        <button className="invite-button" onClick={handleInviteClick}>Invite More</button>
        <button className="leave-room-button" onClick={handleLeaveRoom}>Leave Room</button>
        <div className="settings-icons">
          <i className="icon-gear"></i>
          <i className="icon-settings"></i>
        </div>
      </div>

      {/* Render the popup if showPopup is true */}
      {showPopup && <Roomcreatedpop roomId={roomId} roomLink={roomLink} onClose={closePopup} />}
    </div>
  );
};

export default TopBar;

