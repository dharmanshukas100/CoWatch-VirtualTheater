import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { MediaControlProvider } from './Context/MediaControlContext';
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
import ProtectedRoute from './component/ProtectedRoute';
import Sidebar from './component/Sidebar';
import VideoPlayer from './component/VideoPlayer';
import Chat from './component/Chat';
import TopBar from './component/TopBar';
import { ToastContainer } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';  // Add this line



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

  const [currentRoom, setCurrentRoom] = useState(null);

  // Function to update current room
  const handleJoinRoom = (room) => {
    setCurrentRoom(room);
    localStorage.setItem("currentRoomName", room.roomName);
  };

  useEffect(() => {
    const savedRoomName = localStorage.getItem("currentRoomName");
    if (savedRoomName) {
      setCurrentRoom({ roomName: savedRoomName });
    }
  }, []);

  const [showSignin, setShowSignin] = useState(false);
  const [showRoom, setShowRoom] = useState(false);
  
  const [prevPath, setPrevPath] = useState('/'); 
  const navigate = useNavigate();
  const location = useLocation();

  const handlesignupClick = () => {
    setPrevPath(location.pathname);
    setShowSignup(true);
    setShowSignin(false);
    navigate("/signup");
  };

  const handleJoinRoomClick = () => {
    const token = localStorage.getItem('token');
    if (token){
      setShowSignup(false);
      setShowSignin(false);
      setShowRoom(true);
      console.log(setShowRoom);
      navigate("/join/:roomId");
    }
    else{
      setShowSignin(true);
      navigate("/login");
    }
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

    // Retrieve the "from" path from state, or default to "/dashboard"
    // const from = location.state?.from || '/dashboard';
    // localStorage.setItem('token', 'YOUR_AUTH_TOKEN'); // Replace with actual token from API response
    // navigate(from, { replace: true });
    };


  // const [isMuted, setIsMuted] = useState(false);
  // const [isVideoOff, setIsVideoOff] = useState(false);

  // const onToggleAudio = () => {
  //   setIsMuted((prevState) => !prevState);
  //   console.log(isMuted ? "Audio Unmuted" : "Audio Muted");
  // };

  // const onToggleVideo = () => {
  //   setIsVideoOff((prevState) => !prevState);
  //   console.log(isVideoOff ? "Video On" : "Video Off");
  // };

  const { roomId } = useParams();
  const isJoinRoomPath = location.pathname.startsWith('/join/');
  

  return (
    <MediaControlProvider>
      
      <div className={`App ${isJoinRoomPath ? "join-room-bar" : ""}`}>
        {(!showSignin && !showSignup) && (
          <>
            {/* Conditionally render Navbar or Topbar based on path */}
            {!isJoinRoomPath && (
              <Navbar onsigninclick={handlesigninClick} onsignupclick={handlesignupClick} />
            )}
      
            {/* Conditional rendering of routes */}
            {isJoinRoomPath ? (
              <TopBar currentRoom={currentRoom} />
            ) : null}
            {/* <Navbar onsigninclick={handlesigninClick} onsignupclick={handlesignupClick} /> */}
            <ToastContainer /> {/* Toast Container for React Toastify */}
            <Routes>
              <Route path="/" element={<Home onsignupclick={handlesignupClick} />} />
              <Route path="/howitwork" element={<Howitwork onsignupclick={handlesignupClick} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/createroom" element={<Createroom />} />
              <Route path="/dashboard" element={<Dashboard onjoinroomclick={handleJoinRoomClick} onJoinRoom={handleJoinRoom} />} />
              {/* <Route path="/dashboard/video-call/:roomId" element={<VideoCall />} /> */}
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/join/:roomId" element={
                <ProtectedRoute>
                  <div className="room SubRoom">
                    <Sidebar participants={participants} />
                    {/* <VideoPlayer /> */}
                    <Chat messages={messages} sendMessage={sendMessage} />
                    {/* <Controls onMute={() => {}} onEmoji={() => {}} onSettings={() => {}} /> */}
                  </div>
                </ProtectedRoute>
                
                } 
              />
            </Routes>
            {!isJoinRoomPath && (
              <Footer />
            )}
      
            {/* Conditional rendering of routes */}
            {isJoinRoomPath ? (
              null
            ) : null}
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
    </MediaControlProvider>
  );
}

export default App;
