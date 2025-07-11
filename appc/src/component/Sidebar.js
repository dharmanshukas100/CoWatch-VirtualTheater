// // import React from 'react';
// // import VideoCall from './VideoCall';
// // import '../index.css';

// // const Sidebar = ({ roomId }) => {
  
// //   return(
// //     <div className="sidebar">
// //       <VideoCall roomId={roomId} />
// //     </div>
// //   )
// // };

// // export default Sidebar;
// import React, { useState } from 'react';
// import VideoCall from './VideoCall';
// import JoinRoom from './VideoPlayer';
// import '../index.css';

// const Sidebar = ({ roomId }) => {
//   const [isAudioEnabled, setIsAudioEnabled] = useState(true);
//   const [isVideoEnabled, setIsVideoEnabled] = useState(true);

//   const handleToggleAudio = () => {
//     setIsAudioEnabled((prev) => !prev);
//   };

//   const handleToggleVideo = () => {
//     setIsVideoEnabled((prev) => !prev);
//   };

//   return (
//     <div className="sidebar">
//     {/* //   <div className="controls">
//     //     <button onClick={handleToggleAudio}>
//     //       {isAudioEnabled ? 'Mute Audio' : 'Unmute Audio'}
//     //     </button>
//     //     <button onClick={handleToggleVideo}>
//     //       {isVideoEnabled ? 'Turn Off Video' : 'Turn On Video'}
//     //     </button>
//     //   </div> */}
//       <VideoCall
//         roomId={roomId}
//         isAudioEnabled={isAudioEnabled}
//         isVideoEnabled={isVideoEnabled}
//       />
//       <JoinRoom/>

//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from 'react';
import VideoCall from './VideoCall';
import JoinRoom from './VideoPlayer';
import '../index.css';

const Sidebar = ({ roomId }) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const handleToggleAudio = () => {
    setIsAudioEnabled((prev) => !prev);
  };

  const handleToggleVideo = () => {
    setIsVideoEnabled((prev) => !prev);
  };

  return (
    <div className="sidebar">
      <VideoCall
        roomId={roomId}
        isAudioEnabled={isAudioEnabled}
        isVideoEnabled={isVideoEnabled}
      />
      <JoinRoom
        roomId={roomId}
        isAudioEnabled={isAudioEnabled}
        isVideoEnabled={isVideoEnabled}
        toggleAudio={handleToggleAudio}
        toggleVideo={handleToggleVideo}
      />
    </div>
  );
};

export default Sidebar;
