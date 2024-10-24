import React from 'react'
import lightLogo from '../assets/white.png'
import '../home.css'

export default function navbar() {
  return (
    <nav id='header-nav'>
        <div className='siteLogo'>
            <img src={lightLogo} alt="COWATCH"/>
        </div>
        <div className='pagetabs'>
            <ul className='pagetabsUl'>
                <li>Home</li>
                <li>Explore Rooms</li>
                <li>Create Room</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </div>
        <div className='signInOut'>
            <button className='signInOut-btn'>Login</button>
            <button className='signInOut-btn'>Sign Up</button>
        </div>
    </nav>
  )
}
