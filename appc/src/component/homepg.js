import React from 'react'
import Icon1 from '../assets/home ele 1.png'
import IconH21 from '../assets/home2 icon1.png'
import IconH22 from '../assets/home2 icon2.png'
import IconH23 from '../assets/home2 icon3.png'
import IconH31 from '../assets/home3 icon1.png'
import IconH32 from '../assets/home3 icon2.png'
import IconH33 from '../assets/home3 icon3.png'
import IconH34 from '../assets/home3 icon4.png'
import IconH41 from '../assets/home4 icon1.png'
import IconH42 from '../assets/home4 icon2.png'
import IconH43 from '../assets/home4 img1.png'
import IconH44 from '../assets/home4 starA.png'
import IconH45 from '../assets/home4 star.png'


import '../home.css'


export default function Homepg() {
  return (
    <>
    <section id='sec1-home'>
        <div className='home1'>
            <h1 className='home1-head'>Watch<span className='home1-span'> Together</span>, <br></br>No Matter the<span className='home1-span'> Distance</span></h1>
            <h5 className='home1-h5'>Stream your favourite movies and shows with friends in real-time. Create virtual rooms, chat, and sync playback</h5>
            <button className='home1-btn'>GET STARTED</button>
        </div>
        <div className='home1-icon'>
            <img src={Icon1} alt="CoWatch The Virtual Theatre"/>
        </div>
    </section>
    <section className='Padding'>
        <div className='home2-Mhead'>
            <h1 className='home2-h1'>What Makes CoWatch Special?<div className='lineIcon'></div></h1>
            <button className='home2-btn'>EXPLORE FEATURES</button>
        </div>
        <div className='home2-feature Padding'>
            <div className='home2-card'>
                <img src={IconH21} alt="" />
                <h1>Real Time Interaction</h1>
            </div>
            <div className='home2-card'>
                <img src={IconH22} alt="" />
                <h1>Virtual Room Creation</h1>
            </div>
            <div className='home2-card'>
                <img src={IconH23} alt="" />
                <h1>Multi Platform Integration</h1>
            </div>
        </div>
    </section>
    <section className='Padding'>
        <div className='home2-Mhead'>
            <h1 className='home2-h1'>How CoWatch Works?<div className='lineIcon'></div></h1>
            <button className='home2-btn'>TRY IT NOW</button>
        </div>
        <div className='home3-Subsec'>
            <div className='home3-options'>
                <img src={IconH32} alt="" />
                <h1>Create a Room</h1>
            </div>
            <img src={IconH31} alt="&" />
            <div className='home3-options'>
                <img src={IconH33} alt="" />
                <h1>Invite Friends</h1>
            </div>
            <img src={IconH31} alt="&" />
            <div className='home3-options'>
                <img src={IconH34} alt="" />
                <h1>Start Watching</h1>
            </div>

        </div>

    </section>
    <section className='Padding'>
        <div className='home2-Mhead'>
            <h1 className='home2-h1'>What Are Users Are Saying<div className='lineIcon'></div></h1>
            {/* <button className='home2-btn'>TRY IT NOW</button> */}
        </div>
        <div className='reviewCardSlide'>
            <img  className='LFMove' src={IconH41} alt="Left" />
            <div className='reviewCard'>
                <img className='UserImg' src={IconH43} alt="User" />
                <h2 className='home4-H2'>Andy Pros Con</h2>
                <div className='ReviewRate'>
                    <img className='ReviewStar' src={IconH45} alt="*" />
                    <img className='ReviewStar' src={IconH45} alt="*" />
                    <img className='ReviewStar' src={IconH45} alt="*" />
                    <img className='ReviewStar' src={IconH45} alt="*" />
                    <img className='ReviewStar' src={IconH45} alt="*" />
                </div>
                <p className='Review-note'>CoWatch offers a seamless, interactive way to watch your favorite shows and movies with friends, no matter the distance. The platform's real-time video syncing and integrated video calls allow for a truly shared viewing experience.</p>
            </div>
            <img className='LFMove' src={IconH42} alt="Right" />
        </div>

        
    </section>
    
      
    </>
  )
}