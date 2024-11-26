import React, { useEffect, useState } from 'react';
import muteIcon from '../assets/controls-icons/mute.svg'; 
import { useMediaControl } from '../Context/MediaControlContext';
import reactIcon from '../assets/controls-icons/react.svg';
import videoIcon from '../assets/controls-icons/video-icon.svg';

import { useParams } from 'react-router-dom';
import '../index.css';
import VideoCall from "./VideoCall";


const JoinRoom = ({isAudioEnabled, isVideoEnabled, toggleAudio, toggleVideo}) => {
    const { roomId } = useParams();
    const [videoLink, setVideoLink] = useState(null);
    
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
        fetchVideoLink();
    }, [roomId]);

    if (!videoLink) {
        return <div className='loadingvideo'><h1>Loading video..</h1></div>;
    }

    // Helper function to extract YouTube video ID
    const extractYouTubeID = (url) => {
        const match = url.match(/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
    };

    const videoID = extractYouTubeID(videoLink);
    const embedURL = videoID ? `https://www.youtube.com/embed/${videoID}` : null;


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
                        // style={{ width: '100%', height: '500px' , border-radius: '12px' }}
                    ></iframe>
                ) : (
                    <div>Invalid YouTube link</div>
                )}
            </div>
            <div className="control-panel">
                <button className="control-button" onClick={toggleAudio}>
                <img src={muteIcon} alt="Mute Icon" className="icon" />
                {/* {isAudioEnabled ? 'Mute' : 'Unmute'} */}
                </button>
                <button className="control-button" onClick={toggleVideo}>
                <img src={videoIcon} alt="Video Icon" className="icon" />
                {/* {isVideoEnabled ? 'Turn Video Off' : 'Turn Video On'} */}
                </button>
            </div>
        </div>
    );
};

export default JoinRoom;
