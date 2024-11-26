import React, { useEffect, useState } from 'react';
import '../home.css';
import lightLogo from '../assets/white.png';



const TopBar = ({ roomName }) => {
  const [rooms, setRooms] = useState([]);

  
  return (
    <div className="top-bar">
      <div className='siteLogo'>
        <img src={lightLogo} alt="COWATCH" />
      </div>
      <div className="room-name">Display the room name</div>
      <h3>Current Room: {roomName}</h3>
      <div className="top-buttons">
        <button className="invite-button">Invite More</button>
        <div className="settings-icons">
          {/* Add icons using a library like FontAwesome or material-icons */}
          <i className="icon-gear"></i>
          <i className="icon-settings"></i>
        </div>
      </div>
    </div>
  )
}

export default TopBar
