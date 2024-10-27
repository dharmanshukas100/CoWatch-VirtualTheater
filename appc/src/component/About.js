import React from 'react'
import LogoCoWatch from '../assets/dark.png'
import IconH21 from '../assets/home2 icon1.png'
import IconH22 from '../assets/home2 icon2.png'
import IconH23 from '../assets/home2 icon3.png'

export default function About() {
  return (
    <>
    <section className='Padding'>
        <div>
            <p className='HIW-Page-Heading Poppins'>About CoWatch</p>
        </div>
        <div className='Quote-section-1'>
            <p className='Quote-HeadA Poppins'>Bringing people closer, one movie at a time.</p>
            <p className='Quote-ParaA Poppins'>CoWatch is a platform designed to make shared streaming experiences easy, fun, and truly interactive. Whether you’re watching a new release or rewatching a favorite show, CoWatch lets you stay in sync with friends and family anywhere in the world.</p>
        </div>
        <div className='Step1'>
          <div>
            <img src={LogoCoWatch} alt="Logo" />
          </div>
          <div className='step-detail-section'>
            <div className='step1-text'>
              <p className='Quote-HeadB Poppins'>our Story</p>
              <p className='Quote-ParaA Poppins'>The idea behind CoWatch was born from a simple question: How can we make watching movies together easy, no matter the distance? In an increasingly digital world, we believe that movies can connect people across miles and time zones. CoWatch was created to bring that shared experience to life, allowing you to watch together, chat, and enjoy every laugh, thrill, and plot twist with the people who matter most. Since our start, we’ve been passionate about creating a platform that’s intuitive, flexible, and truly fun for everyone.</p>
            </div>
          </div>
        </div>

        <div><p className='head1-About Poppins'>What We Offer</p></div>

        <div className='home2-feature Padding'>
            <div className='home2-card cards-aboutpage Poppins'>
                <img src={IconH21} alt="" />
                <h1>Real Time Interaction</h1>
            </div>
            <div className='home2-card cards-aboutpage Poppins'>
                <img src={IconH22} alt="" />
                <h1>Virtual Room Creation</h1>
            </div>
            <div className='home2-card cards-aboutpage Poppins'>
                <img src={IconH23} alt="" />
                <h1>Multi Platform Integration</h1>
            </div>
        </div>
    </section>
      
    </>
  )
}
