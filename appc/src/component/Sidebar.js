// import React from 'react';
// import '../home.css'


// const chatSection = () => {
//   return (
//     <div className="chat-section">
//       <div className="tabs">
//         <button className="active-tab">Chat</button>
//         <button>Participants</button>
//       </div>
//       <div className="messages">
//         {/* Sample chat messages */}
//         {[1, 2, 3, 4].map((message, index) => (
//           <div key={index} className="message">
//             <span className="message-name">Name</span>
//             <p className="message-text">
//               Hey! Ready for the movie? Can't wait to watch it!
//             </p>
//             <span className="message-time">09:05 PM</span>
//           </div>
//         ))}
//       </div>
//       <div className="message-input">
//         <input type="text" placeholder="Send your message..." />
//         <button className="send-button">Send</button>
//       </div>
//     </div>
//   )
// }

// export default chatSection
// src/components/Sidebar.js
import React from 'react';
import Participant from './Participant';
import '../index.css';
const Sidebar = ({ participants }) => (
  <div className="sidebar">
    {participants.map((participant, index) => (
      <Participant key={index} participant={participant} />
    ))}
  </div>
);

export default Sidebar;
