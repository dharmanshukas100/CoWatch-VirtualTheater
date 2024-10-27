import React from 'react'
import ContactIconA from '../assets/bluewhatsapp.png'
import ContactIconB from '../assets/blueinstagram.png'
import ContactIconC from '../assets/bluelinkedin.png'
import ContactIconD from '../assets/bluegmail.png'

export default function Contact() {
  return (
    <>
    <section className='Padding'>
        <div>
            <p className='Head1-contact Poppins'>Contact Us</p>
            <p className='Subhead1-contact Poppins' >We’d love to hear from you!</p>
        </div>
        <div className='contactform-container '>
            <input type="text" placeholder='Full Name' className='Poppins' />
            <input type="text" placeholder='Email' className='Poppins'/>
            <textarea name="" placeholder='Enter Your Message...' className='Poppins' ></textarea>
            <button className='Nunito'>Send Message</button>
        </div>
        <div className='Another-contact'>
            <div>
                <p className='Nunito'>Reach Us At <span>Contact@Cowatch.com</span></p>
            </div>
            <div className='Social-contact'>
                <a href="www.google.com"><img src={ContactIconA} alt="" /></a>
                <a href="www.google.com"><img src={ContactIconB} alt="" /></a>
                <a href="www.google.com"><img src={ContactIconC} alt="" /></a>
                <a href="www.google.com"><img src={ContactIconD} alt="" /></a>
            </div>
        </div>
        
    </section>
    </>
  )
}
