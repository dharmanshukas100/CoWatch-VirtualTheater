import './App.css';
import React, { useState } from 'react';
import Navbar from './component/navbar';
import Home from './component/homepg';
import Footer from './component/footer';
import SignUp from './component/Userregister';
import SignIn from './component/UserSignIn';

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowSignIn(false); // Hide Sign In form if it’s open
  };

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowSignUp(false); // Hide Sign Up form if it’s open
  };

  const handleBackBtnClick = () => {
    setShowSignUp(false);
    setShowSignIn(false);
  };

  return (
    <div className="App">
      {!showSignUp && !showSignIn && (
        <>
          <Navbar onSignUpClick={handleSignUpClick} onSignInClick={handleSignInClick} />
          <Home /> 
          <Footer /> 
        </>
      )}

      {showSignUp && <SignUp OnBackBtnClick={handleBackBtnClick} onSignInClick={handleSignInClick} />}
      {showSignIn && <SignIn OnBackBtnClick={handleBackBtnClick} />}
    </div>
  );
}

export default App;
