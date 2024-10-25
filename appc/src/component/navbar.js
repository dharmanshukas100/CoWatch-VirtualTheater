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
                <li className='Inter'>Home</li>
                <li className='Inter'>Create Room</li>
                <li className='Inter'>How It's Work</li>
                <li className='Inter'>About</li>
                <li className='Inter'>Contact</li>
            </ul>
        </div>
        <div className='signInOut'>
            <button className='signInOut-btn signIn-btn Nunito'>Login</button>
            <button className='signInOut-btn signOut-btn Nunito'>Sign Up</button>
        </div>
    </nav>
  )
}
