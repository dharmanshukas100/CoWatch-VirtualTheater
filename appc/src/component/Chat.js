import React, { useState } from 'react';
import '../index.css'; 

const Chat = () => {
  const [tab, setTab] = useState('Chat'); // State to manage active tab
  const [messages, setMessages] = useState([
    { id: 1, type: 'received', text: 'Hello', time: '09:02 PM', name: 'Name', profileImage: 'https://via.placeholder.com/25' },
    { id: 2, type: 'sent', text: 'Hey!', time: '09:03 PM' },
  ]);
  const [message, setMessage] = useState(''); // State to manage the input message

  const handleTabClick = (tabName) => setTab(tabName);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now(), type: 'sent', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      {/* Tabs for Chat and Participants */}
      <div className="chat-tabs">
        <div className={tab === 'Chat' ? 'active' : ''} onClick={() => handleTabClick('Chat')}>
          Chat
        </div>
        <div className={tab === 'Participants' ? 'active' : ''} onClick={() => handleTabClick('Participants')}>
          Participants
        </div>
      </div>

      {/* Chat Messages Area */}
      {tab === 'Chat' && (
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.type}`}>
              {msg.type === 'received' && (
                <div className="text">
                  <img src={msg.profileImage} alt="Profile" className="profile-pic" />
                  <div className="message-content">
                    <div className="participant-name">{msg.name}</div>
                    <div className="text">{msg.text}</div>
                  </div>
                </div>
              )}
              {msg.type === 'sent' && (
                <div className="text">
                  {msg.text}
                </div>
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
