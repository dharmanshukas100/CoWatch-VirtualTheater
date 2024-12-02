// import React from 'react';
// import '../home.css';
// import lightLogo from '../assets/white.png';



// const TopBar = ({ currentRoom }) => {
//   // const [rooms, setRooms] = useState([]);

  
//   return (
//     <div className="top-bar">
//       <div className='siteLogo'>
//         <img src={lightLogo} alt="COWATCH" />
//       </div>
//       <div>
//         <h3>{currentRoom ? currentRoom.roomName : "Room"}</h3>
//       </div>
//       <div className="top-buttons">
//         <button className="invite-button">Invite More</button>
//         <div className="settings-icons">
//           {/* Add icons using a library like FontAwesome or material-icons */}
//           <i className="icon-gear"></i>
//           <i className="icon-settings"></i>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default TopBar
import React, { useState } from 'react';
import '../home.css';
import lightLogo from '../assets/white.png';
import Roomcreatedpop from './Roomcreatedpop';

const TopBar = ({ currentRoom }) => {
  const [showPopup, setShowPopup] = useState(false);

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

  return (
    <div className="top-bar">
      <div className='siteLogo'>
        <img src={lightLogo} alt="COWATCH" />
      </div>
      <div>
        <h3>{currentRoom ? currentRoom.roomName : "Room"}</h3>
      </div>
      <div className="top-buttons">
        <button className="invite-button" onClick={handleInviteClick}>Invite More</button>
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
