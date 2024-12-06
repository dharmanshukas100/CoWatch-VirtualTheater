import React, { useState, useEffect } from 'react';
import socket from "../socket"; 
import { useParams, useNavigate } from 'react-router-dom';
import Sendbtn from '../assets/send btn.png';
import '../home.css';

const Chat = () => {
  const { roomId } = useParams();
  const fname = localStorage.getItem('loggedInUserfname');
  const navigate = useNavigate(); // Add history for navigation
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState('Chat'); 
  const [participants, setParticipants] = useState([]);
  
  
  const handleTabClick = (tabName) => setTab(tabName);

  // Load messages from localStorage when the component mounts
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];
    console.log("Loaded messages from localStorage:", savedMessages);
    setMessages(savedMessages);
  }, []);

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
      socket.emit("joinRoom", { roomId, fname });
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
      setParticipants(updatedParticipants);
    });

    // Cleanup on component unmount or room leave
    return () => {
      socket.off("receiveMessage");
      socket.off("updateParticipants");
      socket.emit("leaveRoom", { roomId, fname }); // Trigger the leaveRoom event
      localStorage.removeItem("chatMessages"); // Remove messages from localStorage
      setMessages([]); // Clear messages from state
    };
  }, [roomId, fname]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        senderId: "You",
        fname,
        message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      socket.emit("sendMessage", { roomId, message, fname });
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem("chatMessages", JSON.stringify(updatedMessages)); // Save to localStorage
        return updatedMessages;
      });

      setMessage("");
    }
  };

  // Handle leaving the room
  const handleLeaveRoom = () => {
    socket.emit("leaveRoom", { roomId, fname }); // Notify server
    navigate("/dashboard"); // Redirect to dashboard (or another page)
    localStorage.removeItem("chatMessages"); // Clear chat messages from localStorage
    setMessages([]); // Clear messages from state
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
            <button onClick={handleSendMessage}>
              <img src={Sendbtn} alt="Send" />
            </button>
          </div>
        </div>
      )}
      {tab === 'Participants' && (
        <div>
          {participants.length > 0 ? (
            participants.map((participant, index) => (
              <div key={index} className='participant-list'>
                {participant.fname || "Anonymous"}
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
