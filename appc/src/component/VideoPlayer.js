// import React, { useEffect, useState } from 'react';
// import { useMediaControl } from '../Context/MediaControlContext';
// import muteIcon from '../assets/controls-icons/mute.svg'; 
// import Reactemoji from '../assets/react.jpg';
// import Micplay from '../assets/mic on.png';
// import videooff from '../assets/videooff.png';
// import reactIcon from '../assets/controls-icons/react.svg';
// import videoIcon from '../assets/controls-icons/video-icon.svg';

// import { useParams } from 'react-router-dom';
// import '../index.css';
// import VideoCall from "./VideoCall";


// const JoinRoom = ({isAudioEnabled, isVideoEnabled, toggleAudio, toggleVideo}) => {
//     const { roomId } = useParams();
//     const [videoLink, setVideoLink] = useState(null);
    
//     useEffect(() => {
//         const fetchVideoLink = async () => {
//             try {
//                 const response = await fetch(`https://co-watch.vercel.app/auth/join/${roomId}`);
//                 const data = await response.json();

//                 if (response.ok) {
//                     setVideoLink(data.videoLink);
//                 } else {
//                     console.error('Error from backend:', data.error);
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch video link:', error);
//             }
//         };
//         fetchVideoLink();
//     }, [roomId]);

//     if (!videoLink) {
//         return <div className='loadingvideo'><h1>Loading video..</h1></div>;
//     }

//     // Helper function to extract YouTube video ID
//     const extractYouTubeID = (url) => {
//         const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
//         return match ? match[1] : null;
//     };

//     const videoID = extractYouTubeID(videoLink);
//     const embedURL = videoID ? `https://www.youtube.com/embed/${videoID}` : null;


//     return (
//         <div>
//             <div className="main-video">
//                 {embedURL ? (
//                     <iframe
//                         className='video-iframe'
//                         src={embedURL}
//                         frameBorder="0"
//                         allow="autoplay; encrypted-media"
//                         allowFullScreen
//                         title="YouTube Video Player"
//                         // style={{ width: '100%', height: '500px' , border-radius: '12px' }}
//                     ></iframe>
//                 ) : (
//                     <div>Invalid YouTube link</div>
//                 )}
//             </div>
//             <div className="control-panel">
//                 <button className="control-button" onClick={toggleAudio}>
//                     <img 
//                         src={isAudioEnabled ? Micplay : muteIcon} 
//                         alt="Audio Control Icon" 
//                         className="icon" 
//                     />
//                 </button>
//                 <button className="control-button" onClick={toggleVideo}>
//                     <img 
//                         src={isVideoEnabled ? videoIcon : videooff} 
//                         alt="Video Control Icon" 
//                         className="icon" 
//                     />
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default JoinRoom;





import React, { useEffect, useState } from 'react';
import socket from "../socket";
import { useParams } from 'react-router-dom';
import muteIcon from '../assets/controls-icons/mute.svg'; 
import Reactemoji from '../assets/reactemoji.png';
import Micplay from '../assets/mic on.png';
import videooff from '../assets/videooff.png';
import videoIcon from '../assets/controls-icons/video-icon.svg';
import '../index.css';


// const socket = io("https://co-watch.vercel.app"); // Replace with your server URL

const JoinRoom = ({ isAudioEnabled, isVideoEnabled, toggleAudio, toggleVideo }) => {
    const { roomId } = useParams();
    const [videoLink, setVideoLink] = useState(null);
    const [emoji, setEmoji] = useState(null); // To handle emoji reactions
    const [showEmoji, setShowEmoji] = useState(false); // To toggle emoji visibility
    const [reactions, setReactions] = useState([]); // Track received reactions


    useEffect(() => {
        const fetchVideoLink = async () => {
            try {
                const response = await fetch(`https://co-watch.vercel.app/auth/join/${roomId}`);
                const data = await response.json();

                if (response.ok) {
                    setVideoLink(data.videoLink);
                } else {
                    console.error('Error from backend:', data.error);
                }
            } catch (error) {
                console.error('Failed to fetch video link:', error);
            }
        };

        // Listen for incoming reactions
        socket.on("receiveReaction", (reaction) => {
            setReactions((prevReactions) => [...prevReactions, reaction]);
        });

        // return () => {
        //     // Clean up listeners on component unmount
        //     socket.off("receiveReaction");
        // };

        fetchVideoLink();
    }, [roomId]);

    if (!videoLink) {
        return <div className='loadingvideo'><h1>Loading video...</h1></div>;
    }

    const extractYouTubeID = (url) => {
        const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
    };

    const videoID = extractYouTubeID(videoLink);
    const embedURL = videoID ? `https://www.youtube.com/embed/${videoID}` : null;

    
    const handleReact = () => {
        setEmoji("🎉"); // Example emoji
        socket.emit("sendReaction", { emoji, roomId });
        setShowEmoji(true);

        // Automatically hide the emoji after 2 seconds
        setTimeout(() => {
            setShowEmoji(false);
        }, 2000);
    };

    return (
        <div>
            <div className="main-video">
                {embedURL ? (
                    <iframe
                        className='video-iframe'
                        src={embedURL}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title="YouTube Video Player"
                    ></iframe>
                ) : (
                    <div>Invalid YouTube link</div>
                )}
            </div>
            <div className="control-panel">
                <button className="control-button" onClick={toggleAudio}>
                    <img 
                        src={isAudioEnabled ? Micplay : muteIcon} 
                        alt="Audio Control Icon" 
                        className="icon" 
                    />
                </button>
                <button className="control-button" onClick={toggleVideo}>
                    <img 
                        src={isVideoEnabled ? videoIcon : videooff} 
                        alt="Video Control Icon" 
                        className="icon" 
                    />
                </button>
                <button className="control-button react-button" onClick={handleReact}>
                    <img 
                        src={Reactemoji} 
                        alt="React Icon" 
                        className="icon" 
                    />
                </button>
            </div>
            {showEmoji && (
                <div className="emoji-display">
                    {emoji}
                </div>
            )}
        </div>
    );
};

export default JoinRoom;
