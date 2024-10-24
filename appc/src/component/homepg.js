import React from 'react'
import Icon1 from '../assets/home ele 1.png'
import IconH21 from '../assets/home2 icon1.png'
import IconH22 from '../assets/home2 icon2.png'
import IconH23 from '../assets/home2 icon3.png'
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
    
      
    </>
  )
}