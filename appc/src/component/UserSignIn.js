import React, { useState } from 'react';
import FormPoster from '../assets/login banner.png';
import BackBtn from '../assets/Back Arrow.png';
import InvisibleEye from '../assets/Invisible.png';
import VisibleEye from '../assets/VisibleEye.png';
import GoogleIn from '../assets/Google.png';
import FacebookIn from '../assets/facebookLogin.png';
import CowatchLogo from '../assets/dark.png';

import '../home.css';

export default function UserSignIn({ OnBackBtnClick, onSignUpClick }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  
  return (
    <div className="container">
      <div className="left-section">
        <div className="leftSectionTop">
          <div>
            <button className="BackBtn" onClick={OnBackBtnClick}>
              <img src={BackBtn} alt="Back" />
            </button>
          </div>
          <div className="siteLogo">
            <img src={CowatchLogo} alt="COWATCH" />
          </div>
        </div>
        <img src={FormPoster} alt="Movie Posters" className="movie-posters" />
      </div>

      <div className="right-section">
        <div className="sign-up-form sign-in-form">
          <h2 className="Inter">Sign In to CoWatch</h2>
          
          <input type="email" placeholder="Email" className="Nunito" />

          <div className="Passwordinput Nunito">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
            />
            <img
              src={passwordVisible ? VisibleEye : InvisibleEye}
              alt="Toggle Visibility"
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            />
          </div>

          <div className='Remember-Forgot'>
            <a href="#" className='RememberMe Inter'>Remember me</a>
            <a href="#" className='Forgot Nunito'>Forgot Password?</a>

          </div>

          <button className="create-account-button Inter">Sign In</button>

          <div className="divider Nunito">
            <hr className="LineHR" />Or Sign in with<hr className="LineHR" />
          </div>

          <div className="social-signup">
            <button className="social-button">
              <img src={GoogleIn} alt="Google" />
            </button>
            <button className="social-button">
              <img src={FacebookIn} alt="Facebook" />
            </button>
          </div>

          <p className="login-link Nunito">
            Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSignUpClick(); }}>Sign Up now</a>
          </p>
        </div>
      </div>
    </div>
  );
}
