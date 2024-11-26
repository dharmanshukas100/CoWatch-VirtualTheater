// import React, { useState } from "react";
// import "../../src/index.css";
// import { FaSmile, FaMicrophoneSlash, FaVideo } from "react-icons/fa";

// const ControlPanel = ({ toggleAudio, toggleVideo }) => {
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isVideoOn, setIsVideoOn] = useState(true);

//   const handleAudioToggle = () => {
//     setIsMicOn((prev) => !prev);
//     toggleAudio(); // Call the function passed from VideoCall
//   };

//   const handleVideoToggle = () => {
//     setIsVideoOn((prev) => !prev);
//     toggleVideo(); // Call the function passed from VideoCall
//   };

//   return (
//     <div className="control-panel">
//       <div className="control-button" onClick={handleAudioToggle}>
//         <FaMicrophoneSlash className={`icon ${isMicOn ? "" : "disabled"}`} />
//       </div>
//       <div className="control-button" onClick={handleVideoToggle}>
//         <FaVideo className={`icon ${isVideoOn ? "" : "disabled"}`} />
//       </div>
//       <div className="control-button">
//         <FaSmile className="icon" />
//       </div>
//     </div>
//   );
// };

// export default ControlPanel;
