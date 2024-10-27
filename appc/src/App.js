import './App.css';
import React, { useState } from 'react';
import Navbar from './component/navbar';
import Home from './component/homepg';
import Footer from './component/footer';
import SignUp from './component/Userregister';
import SignIn from './component/UserSignIn';
import Howitwork from './component/Howitwork';

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showHowitwork, setShowHowitwork] = useState(false);
  const [showHomepage, setShowHomepage] = useState(true);


  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowSignIn(false); 
    setShowHowitwork(false);
    setShowHomepage(false);
  };

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowSignUp(false);
    setShowHowitwork(false);
    setShowHomepage(false);
  };

  const handleBackBtnClick = () => {
    setShowSignUp(false);
    setShowSignIn(false);
    setShowHomepage(true);
  };

  const handlehowitwork = () => {
    setShowHowitwork(true);
    setShowHomepage(false);
  };

  const handlehomepage = () => {
    setShowHowitwork(false);
    setShowHomepage(true);
    setShowSignIn(false);
    setShowSignUp(false);
  };

  return (
    <div className="App">
      {!showSignUp && !showSignIn && !showHowitwork && showHomepage && (
        <>
          
          <Navbar onSignUpClick={handleSignUpClick} onSignInClick={handleSignInClick} onHTworkclick={handlehowitwork} onHomebtnclick={handlehomepage} />
          <Home /> 
          <Footer /> 
        </>
      )}

      {showSignUp && <SignUp OnBackBtnClick={handleBackBtnClick} onSignInClick={handleSignInClick} />}
      {showSignIn && <SignIn OnBackBtnClick={handleBackBtnClick} onSignUpClick={handleSignUpClick} />}

      {showHowitwork && !showSignIn && !showSignUp && (
            <>
              <Navbar onSignUpClick={handleSignUpClick} onSignInClick={handleSignInClick} onHTworkclick={handlehowitwork} onHomebtnclick={handlehomepage} />
              <Howitwork />
              <Footer/>
            </>

      )}
    </div>
  );
}

export default App;
