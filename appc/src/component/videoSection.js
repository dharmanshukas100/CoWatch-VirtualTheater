import React from 'react';
import '../home.css';
import participent1 from '../assets/participent2.jpg';
import volume from '../assets/volume.svg';


const videoSection = () => {
  return (
    <div className="video-section">
      <div className="main-video">
        {/* Use a video element or a placeholder */}
        <video controls>
          <source src="https://www.youtube.com/watch?v=J6ZwO18VgyE&t=6s" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="participants">
        {/* Map through participant data for dynamic rendering */}
        {[1, 2, 3, 4].map((participant, index) => (
          <div key={index} className="participant">
            <div className="box-inner-shadow"></div>
            <img src={participent1} alt="Participant " />
            
            <div className="participant-name">Hina Rastogi</div>
            <div className="status-icons">
              <img className="icon-microphone" src={volume} alt="Volume Icon" />
              <i className="icon-camera"></i>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default videoSection
