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
import RefrshHandler from './RefrshHandler';

function App() {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [prevPath, setPrevPath] = useState('/'); // State to store the last visited path
  const navigate = useNavigate();
  const location = useLocation();


  // const PrivateRoute = ({ element }) => {
  //   return isAuthenticated ? element : <Navigate to="/" />
  // }

  const handlesignupClick = () => {
    setPrevPath(location.pathname); // Save the current path before navigating to SignUp
    setShowSignup(true);
    setShowSignin(false);
    navigate("/signup");
  };

  const handlesigninClick = () => {
    setPrevPath(location.pathname); // Save the current path before navigating to SignIn
    setShowSignin(true);
    setShowSignup(false);
    navigate("/login");
  };

  // Function to handle back button click
  const handleBackBtnClick = () => {
    setShowSignup(false);
    setShowSignin(false);
    navigate(prevPath); // Navigate back to the previously stored path
  };

  // Function to reset signup/signin state on successful signup
  const handleRegisterSuccess = () => {
    setShowSignup(false);
    setShowSignin(false);
  };

  return (
    <div className="App">
      {/* <RefrshHandler setIsAuthenticated={setIsAuthenticated} /> */}
      {(!showSignin && !showSignup) && (
        <>
          <Navbar onsigninclick={handlesigninClick} onsignupclick={handlesignupClick} />
          <Routes>
            <Route path="/" element={<Home onsignupclick={handlesignupClick} />} />
            <Route path="/howitwork" element={<Howitwork onsignupclick={handlesignupClick} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/createroom" element={<Createroom />} />
            <Route path="/Dashboard" element={<Dashboard/>} />
            <Route path="*" element={<Navigate to="/" />} />
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
