import React from 'react';
import lightLogo from '../assets/white.png';
import '../home.css';

export default function Navbar({ onSignUpClick, onSignInClick, onHTworkclick, onHomebtnclick, onAboutbtnclick, onContactbtnclick, onCRbtnclick }) {
  return (
    <nav id='header-nav'>
      <div className='siteLogo'>
        <img src={lightLogo} alt="COWATCH" />
      </div>
      <div className='pagetabs'>
        <ul className='pagetabsUl'>
          <li className='Inter' onClick={onHomebtnclick}>Home</li>
          <li className='Inter' onClick={onCRbtnclick}>Create Room</li>
          <li className='Inter' onClick={onHTworkclick}>How It Work's</li>
          <li className='Inter' onClick={onAboutbtnclick}>About</li>
          <li className='Inter'onClick={onContactbtnclick} >Contact</li>
        </ul>
      </div>
      <div className='signInOut'>
        <button 
          className='signInOut-btn signIn-btn Nunito'
          onClick={onSignInClick}
        >
          Login</button>
        <button 
          className='signInOut-btn signOut-btn Nunito' 
          onClick={onSignUpClick}  
        >
          Sign{'\u00A0'}Up
        </button>
      </div>
    </nav>
  );
}
