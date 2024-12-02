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
    localStorage.removeItem(`chats-${roomId}`);

    // Perform any additional cleanup, like disconnecting video/audio
    // (Assuming functions to disconnect video/audio exist, e.g., `disconnectCall`)
    if (window.peerConnection) {
      window.peerConnection.close(); // Close the WebRTC connection
    }
    if (window.socket) {
      window.socket.emit('user-left', { roomId, userId: window.currentUserId });
      window.socket.disconnect(); // Disconnect the socket
    }

    // Redirect the user back to the dashboard
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
