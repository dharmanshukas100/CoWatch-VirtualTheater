// src/components/Participant.js
import React from 'react';
import '../index.css';
// import VideoCall from '../component/VideoCall.js';

import volume from '../assets/volume.svg';
const Participant = ({ participant }) => (
  <div className="participant">
    <div className="box-inner-shadow"></div>
   
    {/* Map through participant data for dynamic rendering
    {[1, 2, 3, 4].map((participant, index) => (
          <div key={index} className="participant">
            <div className="box-inner-shadow"></div>
            <img src={participent1} alt="Participant " />
            
            <div className="participant-name">Hina Rastogi</div>
            <div className="status-icons">
              <img className="icon-microphone" src={volume} alt="Volume Icon" />
              <i className="icon-camera"></i>
            
            </div>
          </div> */}
    <img src={participant.image} alt="participant" />
    <div className="participant-name">Hina Rastogi</div>
    <div className="status-icons">
      <img className="icon-microphone" src={volume} alt="Volume Icon" />
    </div> 
    {/* <VideoCall/> */}
  </div>
);

export default Participant;
