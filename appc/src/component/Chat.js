import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../index.css';

const socket = io("https://your-backend-url.com"); // Replace with your backend URL

const Chat = ({ roomId }) => {
  const [tab, setTab] = useState('Chat'); // Manage active tab
  const [messages, setMessages] = useState([]); // Chat messages
  const [message, setMessage] = useState(''); // Input message

  useEffect(() => {
    // Join the room on component mount
    socket.emit("joinRoom", roomId);
  

    socket.on("receiveMessage", (data) => {
      console.log("Received message:", data);
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    
    // Listen for new messages
    socket.on("receiveMessage", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
  
    // Cleanup on component unmount
    return () => {
      socket.off("receiveMessage"); // Remove the listener
      socket.disconnect();
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const payload = {
        roomId,
        message,
      };
      socket.emit("sendMessage", payload); // Emit the message to the server
      setMessages((prevMessages) => [
        ...prevMessages,
        { message, senderId: "You", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      {/* Tabs */}
      <div className="chat-tabs">
        <div className={tab === 'Chat' ? 'active' : ''} onClick={() => setTab('Chat')}>
          Chat
        </div>
        <div className={tab === 'Participants' ? 'active' : ''} onClick={() => setTab('Participants')}>
          Participants
        </div>
      </div>

      {/* Chat Messages Area */}
      {tab === 'Chat' && (
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.senderId === "You" ? 'sent' : 'received'}`}>
              {msg.senderId !== "You" && (
                <div className="text">
                  <div className="participant-name">{msg.senderId}</div>
                  <div className="text">{msg.message}</div>
                </div>
              )}
              {msg.senderId === "You" && (
                <div className="text">{msg.message}</div>
              )}
              <div className="timestamp">{msg.time}</div>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="chat-input">
        <input
          type="text"
          placeholder="Send your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>📩</button>
      </div>
    </div>
  );
};

export default Chat;
