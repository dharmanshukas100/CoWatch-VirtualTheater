import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconH51 from '../assets/netflix.png';
import IconH52 from '../assets/youtube.png';
import IconH53 from '../assets/DisneyPlus.png';
import IconH54 from '../assets/APrime.png';
import '../home.css';

export default function Createroom() {
  const [roomName, setRoomName] = useState(''); // State for room name
  const [videoLink, setVideoLink] = useState(''); // State for video link
  const [selectedPlatform, setSelectedPlatform] = useState(null); // State for selected platform
  const navigate = useNavigate();

  // List of platforms with corresponding icons
  const platforms = [
    { id: 'netflix', icon: IconH51, name: 'Netflix' },
    { id: 'youtube', icon: IconH52, name: 'YouTube' },
    { id: 'disney', icon: IconH53, name: 'Disney+' },
    { id: 'prime', icon: IconH54, name: 'Amazon Prime' },
  ];

  // Handle platform selection
  const handlePlatformSelect = (platformId) => {
    setSelectedPlatform(platformId); // Set the selected platform
  };

  // Handle room creation
  const handleCreateRoom = async () => {
    if (!roomName || !videoLink || !selectedPlatform) {
      alert("Please fill in all fields and select a platform.");
      return;
    }

    // Prepare the room data to be sent to the backend
    const roomData = {
      roomName,
      platform: selectedPlatform,
      videoLink,
    };

    try {
      // Send POST request to the backend API to create the room
      const response = await fetch('https://co-watch.vercel.app/auth/createroom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(roomData),
      });

      if (response.ok) {
        console.log("Room created successfully");
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        console.error("Failed to create room:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <>
      <section className="Padding">
        <div className="Div-Room-create">
          <div className="Inter">
            <p className="headpara">Room Name</p>
            <input
              className="headinput"
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter Your Room Name"
            />
          </div>
          <div className="Inter">
            <p className="headpara">Select Platform for Your Room</p>
            <div className="platforms Chooseplateform">
              {platforms.map((platform) => (
                <img
                  key={platform.id}
                  src={platform.icon}
                  alt={platform.name}
                  className={selectedPlatform === platform.id ? 'active-platform' : ''}
                  onClick={() => handlePlatformSelect(platform.id)}
                />
              ))}
            </div>
            <input
              className="headinput"
              type="url"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="Place Video Link..."
            />
          </div>
          <button className="create-btn Nunito" onClick={handleCreateRoom}>CREATE</button>
        </div>
      </section>
    </>
  );
}
