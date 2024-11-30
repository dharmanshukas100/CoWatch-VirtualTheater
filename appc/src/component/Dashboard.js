import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import socket from "../socket"; 

export default function Dashboard({onJoinRoom}) {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://co-watch.vercel.app/auth/createroom')
      .then((res) => res.json())
      .then((rooms) => setRooms(rooms))
      .catch((error) => console.error('Error fetching rooms:', error));
  }, []);
  

  const joinRoom = (roomId) => {
    const room = rooms.find((room) => room.roomId === roomId);
    const fname = localStorage.getItem('loggedInUserfname');

    // Emit joinRoom event
    socket.emit("joinRoom", { roomId, fname });

    // Emit startCall event for the room
    socket.emit("startCall", { roomId });
    
    console.log(`Joining room and starting call for room ID: ${roomId}`);
    
    // onjoinroomclick();
    onJoinRoom(room);

    // Navigate to video call page
    navigate(`/join/${roomId}`);
  };

  return (
    <div>
      <h2>Available Rooms</h2>
      <div>
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.roomId} style={{ border: '1px solid #ddd', padding: '10px', margin: '10px 0' }}>
              <h3>{room.roomName}</h3>
              <p>Platform: {room.platform}</p>
              <p>Members: {room.members.join(', ')}</p>
              <button onClick={() => joinRoom(room.roomId)}>Join Room</button>
            </div>
          ))
        ) : (
          <p>No rooms available at the moment.</p>
        )}
      </div>
    </div>
  );
}
