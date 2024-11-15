import React from 'react';
import '../home.css';


const topBar = () => {
  return (
    <div className="top-bar">
      <div className="logo">CoWatch</div>
      <div className="room-name">Display the room name</div>
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

export default topBar
