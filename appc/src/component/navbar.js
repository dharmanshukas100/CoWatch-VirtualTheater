import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import lightLogo from '../assets/white.png';
import Userprofile from '../assets/userprofile.png';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import '../home.css';

export default function Navbar({ onsigninclick, onsignupclick }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [loggedInUserfname, setLoggedInUserfname] = useState('');
  const [loggedInUserlname, setLoggedInUserlname] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fname = localStorage.getItem('loggedInUserfname');
    const lname = localStorage.getItem('loggedInUserlname');
    if (token && fname && lname) {
      setIsLoggedIn(true);
      setLoggedInUserfname(fname);
      setLoggedInUserlname(lname);
    }
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUserfname');
    localStorage.removeItem('loggedInUserlname');
    handleSuccess('User Logged out');
    setIsLoggedIn(false);
    setShowUserDetails(false);
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  const handleCreateRoomClick = (e) => {
    const token = localStorage.getItem('token');
    if (!token) {
      e.preventDefault();
      onsigninclick();
      navigate('/login'); // Redirects to login if no token
    }
  };

  const toggleUserDetails = () => {
    setShowUserDetails((prevShow) => !prevShow);
  };

  return (
    <>
      <nav id='header-nav'>
        <div className='siteLogo'>
          <img src={lightLogo} alt="COWATCH" />
        </div>
        <div className='pagetabs'>
          <ul className='pagetabsUl'>
            <li className='Inter'>
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className='Inter'>
              <Link to="/createroom" className="nav-link" onClick={handleCreateRoomClick}>Create Room</Link>
            </li>
            <li className='Inter'>
              <Link to="/howitwork" className="nav-link">How It Works</Link>
            </li>
            <li className='Inter'>
              <Link to="/about" className="nav-link">About</Link>
            </li>
            <li className='Inter'>
              <Link to="/contact" className="nav-link">Contact</Link>
            </li>
          </ul>
        </div>
        {!isLoggedIn && (
          <div className='signInOut'>
            <Link to="/login">
              <button className='signInOut-btn signIn-btn Nunito' onClick={onsigninclick}>Login</button>
            </Link>
            <Link to="/signup">
              <button className='signInOut-btn signOut-btn Nunito' onClick={onsignupclick}>Sign Up</button>
            </Link>
          </div>
        )}
        
        {isLoggedIn && (
          <>
            <div>
              <button className='user-img-btn' onClick={toggleUserDetails}>
                <img src={Userprofile} alt="userimg" />
              </button>
            </div>
            <div className={`User-details Nunito ${showUserDetails ? 'visible' : ''}`}>
              <div className='User-name'>
                <h1>Welcome,</h1>
                <p>{loggedInUserfname}{'\u00A0'}{loggedInUserlname}</p> 
              </div>
              <Link to="/Dashboard">
                <button className='User-container-options Nunito'>Dashboard</button>
              </Link>
              <Link>
                <button className='User-container-options Nunito'>Setting</button>              
              </Link>
              <button className='Logout-btn' onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
      </nav>
      <ToastContainer  autoClose={1000} />
    </>
  );
}
