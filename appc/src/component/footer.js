import React from 'react'
import lightLogo from '../assets/white.png'
import SocialIconInsta from '../assets/instagram 1.png'
import SocialIconFace from '../assets/facebook 1.png'
import SocialIconYou from '../assets/youtube 1.png'


export default function footer() {
  return (
    <>
        <section className='MainFooter Padding'>
            <div className='container-foot'>
                <img  className='LogoFoot' src={lightLogo} alt="CoWatch" />
                <div className='SocialIconall'>
                    <img className='invert' src={SocialIconInsta} alt="" />
                    <img className='invert' src={SocialIconFace} alt="" />
                    <img className='invert' src={SocialIconYou} alt="" />
                </div>
                <div className='FootMultiOption Inter'>
                    <p>Features</p>
                    <p>Disclaimer</p>
                    <p>Privacy Policy</p>
                    <p>About</p>
                    <p>Contact</p>
                </div>
            </div>
            <div className='CopyrightDiv'>
                <p>© 2024 CoWatch. All Rights Reserved</p>
            </div>
            
        </section>

      
    </>
  )
}
