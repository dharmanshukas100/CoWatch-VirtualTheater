import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';
import socket from "../socket"; 
import { useParams } from 'react-router-dom';
import '../home.css'


const Chat = () => {
  
  // const socket = io("http://localhost:5000");
  const { roomId } = useParams();
  const fname = localStorage.getItem('loggedInUserfname');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState('Chat'); 
  const handleTabClick = (tabName) => setTab(tabName);
  // const [rooms, setRooms] = useState([]);
  const [participants, setParticipants] = useState([]);



  useEffect(() => {

    socket.on("connect", () => {
      console.log("connected");
    });
    
    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    // Join room
    if (roomId && fname) {
      console.log(`Joining room: ${roomId}`);
      socket.emit("joinRoom", { roomId, fname }); // Include fname here
    } else {
      console.error("Room ID or user name is missing!");
    }
    
  
  
    // Listen for new messages
    socket.on("receiveMessage", (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    socket.on("updateParticipants", (updatedParticipants) => {
      console.log("Updated participants:", updatedParticipants);
      setParticipants(updatedParticipants); // Ensure you define `participants` state
    });


    // fetch('https://co-watch.vercel.app/auth/createroom')
    //   .then((res) => res.json())
    //   .then((rooms) => setRooms(rooms))
    //   .catch((error) => console.error('Error fetching rooms:', error));

    return () => {
      socket.off("receiveMessage"); // Cleanup event listener
      socket.off("updateParticipants");
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const payload = { roomId, message, fname };
      socket.emit("sendMessage", payload); // Emit message
      setMessages((prev) => [
        ...prev,
        { senderId: "You", message, fname, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
      setMessage('');
    }
  };

  
  return (
    <div className="chat-container">
      <div className="chat-tabs">
        <div className={tab === 'Chat' ? 'active' : ''} onClick={() => handleTabClick('Chat')}>
          Chat
        </div>
        <div className={tab === 'Participants' ? 'active' : ''} onClick={() => handleTabClick('Participants')}>
          Participants
        </div>
      </div>
      {tab === 'Chat' && (
        <div className='chatbox'>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.senderId === "You" ? "sent" : "received"}`}>
                <div className='username'>{msg.fname}</div>
                <div className="text">{msg.message}</div>
                <div className="timestamp">{msg.time}</div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Send your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
            onClick={handleSendMessage}
            >📩</button>
          </div>
        </div>
      )}
      {tab === 'Participants' && (
        <div>
          {participants.length > 0 ? (
            participants.map((participant, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                {participant.fname || "Anonymous"} {/* Fallback for missing fname */}
              </div>
            ))
          ) : (
            <p>No participants in this room.</p>
          )}
        </div>
      )}
    </div>



    
  );
};

export default Chat;
