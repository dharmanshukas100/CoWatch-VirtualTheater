import React from 'react'
import { Link } from 'react-router-dom';
import HWIcon1 from '../assets/IconPopcornFilm.png'
import HWIcon2 from '../assets/shareroomlinkSS.png'
import HWIcon3 from '../assets/virtualroompage.png'



export default function Howitwork() {
  return (
    <>
    <section className='HowitWork Padding'>
        <div>
            <p className='HIW-Page-Heading Poppins'>HOW IT WORKS</p>
        </div>
        <div className='Quote-section-1'>
            <p className='Quote-HeadA Poppins'>Enjoy movies together, no matter where you are!</p>
            <p className='Quote-ParaA Poppins'>CoWatch makes it easy to watch your favorite shows and movies in sync with friends, wherever they are. Just follow these steps to set up your first room and start streaming together!</p>
        </div>
        <div className='Step1'>
          <div>
            <img src={HWIcon1} alt="Icon" />
          </div>
          <div className='step-detail-section'>
            <div className='Step-Numbering Poppins'><p>1.</p></div>
            <div className='step1-text'>
              <p className='Quote-HeadB Poppins'>Create Your Room</p>
              <p className='Quote-ParaA Poppins'>Start by creating your own virtual room. Give it a name, choose a privacy setting, and pick the streaming platform you’ll be using, like YouTube, Netflix, or Prime Video. This is your shared space to watch together</p>
            </div>
          </div>
        </div>
        <div className='Step1'>
          <div className='step-detail-section'>
            <div className='Step-Numbering Poppins'><p>2.</p></div>
            <div className='step1-text'>
              <p className='Quote-HeadB Poppins'>Invite Friends</p>
              <p className='Quote-ParaA Poppins'>Once your room is set up, it’s time to invite friends. Just share the unique room link with anyone you want to join. Friends can hop in from anywhere, making your movie night truly virtual!</p>
            </div>
          </div>
          <div>
            <img src={HWIcon2} alt="Icon" />
          </div>
        </div>
        <div className='Step1'>
          <div>
            <img src={HWIcon3} alt="Icon" />
          </div>
          <div className='step-detail-section'>
            <div className='Step-Numbering Poppins'><p>3.</p></div>
            <div className='step1-text'>
              <p className='Quote-HeadB Poppins'>Sync and Watch</p>
              <p className='Quote-ParaA Poppins'>When everyone is ready, CoWatch syncs the video playback across all devices, so you’re always in sync. Plus, you can chat and react together in real-time, making it feel like you’re in the same room</p>
            </div>
          </div>
        </div>
        <div>
          <p className='Quote-Bottom Poppins'>Ready to start watching together? Join CoWatch and create your first room!</p>
        </div>
        <div className='Createroombtn-div'>
          <Link to="/createroom">
            <button className='Createroombtn Nunito'>Create Your First Room</button>
          </Link>
        </div>



    </section>
      
    </>
  )
}
