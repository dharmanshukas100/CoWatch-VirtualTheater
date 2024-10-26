import React, { useState } from 'react';
import FormPoster from '../assets/login banner.png';
import BackBtn from '../assets/Back Arrow.png';
import InvisibleEye from '../assets/Invisible.png';
import VisibleEye from '../assets/VisibleEye.png';
import GoogleIn from '../assets/Google.png';
import FacebookIn from '../assets/facebookLogin.png';
import CowatchLogo from '../assets/dark.png';

import '../home.css';

export default function Userregister({ OnBackBtnClick, onSignInClick}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
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
        <div className="sign-up-form">
            <h2 className="Inter">Sign Up to CoWatch</h2>
            <p className="form-quote Poppins">
                Create an account and start watching together with your friends. It’s quick and easy!
            </p>

            <div className="input-container Nunito">
                <input type="text" placeholder="First Name" />
                <input type="text" placeholder="Last Name" />
            </div>

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

            <div className="Passwordinput Nunito">
                <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm-Password"
                />
                <img
                src={confirmPasswordVisible ? VisibleEye : InvisibleEye}
                alt="Toggle Visibility"
                onClick={toggleConfirmPasswordVisibility}
                style={{ cursor: "pointer" }}
                />
            </div>

            <button className="create-account-button Inter">Create Account</button>

            <div className="divider Nunito">
                <hr className="LineHR" />Or Sign Up with<hr className="LineHR" />
            </div>

            <div className="social-signup">
                <button className="social-button">
                <img src={GoogleIn} alt="Google" />
                </button>
                <button className="social-button">
                <img src={FacebookIn} alt="Facebook" />
                </button>
            </div>

            <p className="terms Nunito">
                By signing up, you agree to our <a href="www.google.com">Terms of Service</a> and{" "}
                <a href="www.google.com">Privacy Policy</a>.
            </p>
            <p className="login-link Nunito">
                Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSignInClick(); }}>Sign In now</a>
            </p>

        </div>
      </div>
    </div>
  );
}
