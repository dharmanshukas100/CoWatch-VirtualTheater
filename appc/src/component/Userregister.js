import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import FormPoster from '../assets/login banner.png';
import BackBtn from '../assets/Back Arrow.png';
import InvisibleEye from '../assets/Invisible.png';
import VisibleEye from '../assets/VisibleEye.png';
import GoogleIn from '../assets/Google.png';
import FacebookIn from '../assets/facebookLogin.png';
import CowatchLogo from '../assets/dark.png';
import '../home.css';
import { handleError, handleSuccess } from '../utils';

export default function Userregister({ OnBackBtnClick, handleRegisterSuccess, onsigninclick }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  // const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);


  const [signupInfo, setSignupInfo] = useState({
    fname: '',
    lname: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handlechange = (e)=> {
    const {name, value} = e.target;
    console.log(name, value);
    const copySignupInfo = {...signupInfo};
    copySignupInfo[name]= value;
    setSignupInfo(copySignupInfo);
  }

  const handleSignup = async (e)=>{
    e.preventDefault();
    const {fname, lname, email, password} = signupInfo;
    if(!fname || !lname || !email || !password){
      return handleError('Enter complete Details')
    }
    try {
      const url = "https://co-watch.vercel.app/auth/signup";
      const response = await fetch(url, {
        method:"POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      });
      const result = await response.json();
      const {success, message, error} = result;
      if(success){
        handleSuccess(message);
        setTimeout(()=>{
          handleRegisterSuccess();
          navigate('/');          
        }, 1000);
      }
      else if(error){
        const details = error?.details[0].message;
        handleError(details);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  }

  
  return (
    <>
      <div className="container">
        <div className="left-section">
          <div className="leftSectionTop">
            <button className="BackBtn" onClick={OnBackBtnClick}>
              <img src={BackBtn} alt="Back" />
            </button>
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
            <form onSubmit={handleSignup}>
              <div className="input-container Nunito">
                <input type="text" name='fname' autoFocus placeholder="First Name" onChange={handlechange} value={signupInfo.fname} />
                <input type="text" name='lname' autoFocus placeholder="Last Name" onChange={handlechange} value={signupInfo.lname} />
              </div>
              <input type="email" name='email' placeholder="Email" className="Nunito" onChange={handlechange} value={signupInfo.email} />

              <div className="Passwordinput Nunito">
                <input
                  type={passwordVisible ? "text" : "password"}
                  name='password'
                  placeholder="Password"
                  onChange={handlechange}
                  value={signupInfo.password}
                />
                <img src={passwordVisible ? VisibleEye : InvisibleEye} alt="Toggle Visibility" onClick={togglePasswordVisibility} style={{ cursor: "pointer" }} />
              </div>

              {/* <div className="Passwordinput Nunito">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <img src={confirmPasswordVisible ? VisibleEye : InvisibleEye} alt="Toggle Visibility" onClick={toggleConfirmPasswordVisibility} style={{ cursor: "pointer" }} />
              </div> */}

              <button type='submit' className="create-account-button Inter">Create Account</button>
            </form>
            <ToastContainer autoClose={1000} />

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
              By signing up, you agree to our <a href="www.google.com">Terms of Service</a> and <a href="www.google.com">Privacy Policy</a>.
            </p>
            <p className="login-link Nunito">
              Already have an account? <Link to="/login" onClick={(e) => { e.preventDefault(); onsigninclick(); }}>Sign In now</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
