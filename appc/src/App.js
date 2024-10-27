import './App.css';
import React, { useState } from 'react';
import Navbar from './component/navbar';
import Home from './component/homepg';
import Footer from './component/footer';
import SignUp from './component/Userregister';
import SignIn from './component/UserSignIn';
import Howitwork from './component/Howitwork';
import About from './component/About';
import Contact from './component/Contact';
import Createroom from './component/Createroom';

function App() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showHowitwork, setShowHowitwork] = useState(false);
  const [showHomepage, setShowHomepage] = useState(true);
  const [showAboutpage, setShowAboutpage] = useState(false);
  const [showContactpage, setShowContactpage] = useState(false);
  const [showCreateRpage, setShowCreateRpage] = useState(false);


  const handleCreateRClick = () => {
    setShowCreateRpage(true);
    setShowSignUp(false);
    setShowSignIn(false); 
    setShowHowitwork(false);
    setShowHomepage(false);
    setShowAboutpage(false);
    setShowContactpage(false);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowSignIn(false); 
    setShowHowitwork(false);
    setShowHomepage(false);
    setShowAboutpage(false);
  };

  const handleSignInClick = () => {
    setShowSignIn(true);
    setShowSignUp(false);
    setShowHowitwork(false);
    setShowHomepage(false);
    setShowAboutpage(false);
    setShowContactpage(false);
  };

  const handleBackBtnClick = () => {
    setShowSignUp(false);
    setShowSignIn(false);
    setShowHomepage(true);
    // setShowAboutpage(true);
  };

  const handlehowitwork = () => {
    setShowHowitwork(true);
    setShowHomepage(false);
    setShowAboutpage(false);
    setShowContactpage(false);
    setShowCreateRpage(false);

  };

  const handlehomepage = () => {
    setShowHowitwork(false);
    setShowHomepage(true);
    setShowSignIn(false);
    setShowSignUp(false);
    setShowAboutpage(false);
    setShowContactpage(false);
    setShowCreateRpage(false);
  };
  
  const handleAboutpage = () => {
    setShowAboutpage(true);
    setShowHowitwork(false);
    setShowHomepage(false);
    setShowSignIn(false);
    setShowSignUp(false);
    setShowContactpage(false);
    setShowCreateRpage(false);
  };

  const handleContactpage = () => {
    setShowContactpage(true);
    setShowAboutpage(false);
    setShowHowitwork(false);
    setShowHomepage(false);
    setShowSignIn(false);
    setShowSignUp(false);
    setShowCreateRpage(false);
  };

  return (
    <div className="App">
      {!showSignUp && !showSignIn && !showHowitwork && showHomepage && !showContactpage &&(
        <>
          
          <Navbar onSignUpClick={handleSignUpClick} onSignInClick={handleSignInClick} onHTworkclick={handlehowitwork} onHomebtnclick={handlehomepage} onAboutbtnclick={handleAboutpage} onContactbtnclick={handleContactpage} onCRbtnclick={handleCreateRClick} />
          <Home /> 
          <Footer /> 
        </>
      )}

      {showSignUp && <SignUp OnBackBtnClick={handleBackBtnClick} onSignInClick={handleSignInClick} />}
      {showSignIn && <SignIn OnBackBtnClick={handleBackBtnClick} onSignUpClick={handleSignUpClick} />}

      {showHowitwork && !showSignIn && !showSignUp && !showContactpage && !showHomepage &&(
            <>
              <Navbar onSignUpClick={handleSignUpClick} onSignInClick={handleSignInClick} onHTworkclick={handlehowitwork} onHomebtnclick={handlehomepage} onAboutbtnclick={handleAboutpage} onContactbtnclick={handleContactpage} onCRbtnclick={handleCreateRClick} />
              <Howitwork />
              <Footer/>
            </>

      )}

      {showAboutpage && !showHowitwork && !showSignIn && !showSignUp && !showContactpage && (
            <>
              <Navbar onSignUpClick={handleSignUpClick} onSignInClick={handleSignInClick} onHTworkclick={handlehowitwork} onHomebtnclick={handlehomepage} onAboutbtnclick={handleAboutpage} onContactbtnclick={handleContactpage} onCRbtnclick={handleCreateRClick} />
              <About/>
              <Footer/>
            </>

      )}

      {showContactpage && !showAboutpage && !showHowitwork && !showSignIn && !showSignUp && (
            <>
              <Navbar onSignUpClick={handleSignUpClick} onSignInClick={handleSignInClick} onHTworkclick={handlehowitwork} onHomebtnclick={handlehomepage} onAboutbtnclick={handleAboutpage} onContactbtnclick={handleContactpage} onCRbtnclick={handleCreateRClick} />
              <Contact/>
              <Footer/>
            </>

      )}

      {showCreateRpage && !showContactpage && !showAboutpage && !showHowitwork && !showSignIn && !showSignUp && (
            <>
              <Navbar onSignUpClick={handleSignUpClick} onSignInClick={handleSignInClick} onHTworkclick={handlehowitwork} onHomebtnclick={handlehomepage} onAboutbtnclick={handleAboutpage} onContactbtnclick={handleContactpage} onCRbtnclick={handleCreateRClick} />
              <Createroom/>
              <Footer/>
            </>

      )}


    </div>
  );
}

export default App;
