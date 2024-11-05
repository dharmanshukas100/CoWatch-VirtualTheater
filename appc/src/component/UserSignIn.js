import React, { useState } from 'react';
import FormPoster from '../assets/login banner.png';
import BackBtn from '../assets/Back Arrow.png';
import InvisibleEye from '../assets/Invisible.png';
import VisibleEye from '../assets/VisibleEye.png';
import GoogleIn from '../assets/Google.png';
import FacebookIn from '../assets/facebookLogin.png';
import CowatchLogo from '../assets/dark.png';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';


import '../home.css';

export default function UserSignIn({ OnBackBtnClick, onsignupclick, handleSignIn, handleRegisterSuccess }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // const handleSignInClick = (e) => {
  //   e.preventDefault();
  //   const credentials = { email, password };
  //   handleSignIn(credentials); // Pass credentials to the handleSignIn function
  // };
  



  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handlechange = (e)=> {
    const {name, value} = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name]= value;
    setLoginInfo(copyLoginInfo);
  }

  const handleLogin = async (e)=>{
    e.preventDefault();
    const { email, password } = loginInfo;
    if(!email || !password){
      return handleError('Enter complete Details')
    }
    try {
      const url = "https://co-watch-backend.vercel.app/auth/login";
      const response = await fetch(url, {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const { success, message, error, fname, lname, jwtToken } = result;
      if(success){
        handleSuccess(message);
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('loggedInUserfname', fname);
        localStorage.setItem('loggedInUserlname', lname);
        
        setTimeout(()=>{
          handleRegisterSuccess();
          navigate('/');          
        }, 1000);
      } else if(error){
          const details = error?.details[0].message;
          handleError(details);
      } else if (!success) {
          handleError(message);
      }
      console.log(result);
      console.log(fname);
      console.log(lname);
      
    } catch (err) {
        handleError(err);
    }
  }

  

  
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
          <form onSubmit={handleLogin}>
            <input type="email" name='email' placeholder="Email" className="Nunito" onChange={handlechange} value={loginInfo.email} />
            
            <div className="Passwordinput Nunito">
            <input
              type={passwordVisible ? "text" : "password"}
              name='password'
              placeholder="Password"
              onChange={handlechange}
              value={loginInfo.password}
            />
              <img
                src={passwordVisible ? VisibleEye : InvisibleEye}
                alt="Toggle Visibility"
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              />
            </div>

            <div className='Remember-Forgot'>
              <a href="www.google.com" className='RememberMe Inter'>Remember me</a>
              <a href="www.google.com" className='Forgot Nunito'>Forgot Password?</a>

            </div>

            <button type='submit' className="create-account-button Inter">Sign In</button>

          </form>
          <ToastContainer autoClose={1000} />


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
            Don't have an account? <Link to="/signup" onClick={(e) => { e.preventDefault(); onsignupclick(); }}>Sign Up now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
