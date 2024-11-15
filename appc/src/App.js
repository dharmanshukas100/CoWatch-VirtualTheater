import './App.css';
import React, { useState } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './component/navbar';
import Home from './component/homepg';
import Footer from './component/footer';
import SignUp from './component/Userregister';
import SignIn from './component/UserSignIn';
import Howitwork from './component/Howitwork';
import About from './component/About';
import Contact from './component/Contact';
import Createroom from './component/Createroom';
import Dashboard from './component/Dashboard';
// import VideoCall from './component/VideoCall';
// import Chat from './component/Chat';

import Sidebar from './component/Sidebar';
import VideoPlayer from './component/VideoPlayer';
import Chat from './component/Chat';
import { useParams } from "react-router-dom";


function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [participants] = useState([
      { name: 'Alice', image: 'url-to-image', isMuted: false },
      { name: 'Bob', image: 'url-to-image', isMuted: true },
    ]);
  const [messages, setMessages] = useState([]);

  const sendMessage = (msg) => {
    setMessages([...messages, { user: 'You', text: msg }]);
  };

    const [showSignin, setShowSignin] = useState(false);
  const [prevPath, setPrevPath] = useState('/'); 
  const navigate = useNavigate();
  const location = useLocation();

  const handlesignupClick = () => {
    setPrevPath(location.pathname);
    setShowSignup(true);
    setShowSignin(false);
    navigate("/signup");
  };

  const handlesigninClick = () => {
    setPrevPath(location.pathname);
    setShowSignin(true);
    setShowSignup(false);
    navigate("/login");
  };

  const handleBackBtnClick = () => {
    setShowSignup(false);
    setShowSignin(false);
    navigate(prevPath);
  };

  const handleRegisterSuccess = () => {
    setShowSignup(false);
    setShowSignin(false);
  };

  const { roomId } = useParams();

  return (
    <div className="App">
      {(!showSignin && !showSignup) && (
        <>
          <Navbar onsigninclick={handlesigninClick} onsignupclick={handlesignupClick} />
          <Routes>
            <Route path="/" element={<Home onsignupclick={handlesignupClick} />} />
            <Route path="/howitwork" element={<Howitwork onsignupclick={handlesignupClick} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/createroom" element={<Createroom />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/dashboard/video-call/:roomId" element={<VideoCall />} /> */}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/join/:roomId" element={
              <div className="room">
                <Sidebar participants={participants} />
                <VideoPlayer video={{ url: 'url-to-video' }} />
                <Chat messages={messages} sendMessage={sendMessage} />
                {/* <Controls onMute={() => {}} onEmoji={() => {}} onSettings={() => {}} /> */}
              </div>} 
            />
          </Routes>
          <Footer />
        </>
      )}

      {showSignup && (
        <Routes>
          <Route
            path="/signup"
            element={<SignUp OnBackBtnClick={handleBackBtnClick} handleRegisterSuccess={handleRegisterSuccess} onsigninclick={handlesigninClick} />}
          />
        </Routes>
      )}

      {showSignin && (
        <Routes>
          <Route
            path="/login"
            element={<SignIn OnBackBtnClick={handleBackBtnClick} handleRegisterSuccess={handleRegisterSuccess} onsignupclick={handlesignupClick} />}
          />
        </Routes>
      )}
      

    </div>
  );
}

export default App;
