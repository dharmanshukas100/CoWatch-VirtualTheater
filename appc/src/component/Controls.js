import React from 'react';
import './index.css';
import { FaSmile, FaMicrophoneSlash, FaVideo } from 'react-icons/fa'; // Import icons from react-icons

const ControlPanel = () => {
  return (
    <div className="control-panel">
      <div className="control-button">
        <FaSmile className="icon" />
      </div>
      <div className="control-button">
        <FaMicrophoneSlash className="icon" />
      </div>
      <div className="control-button">
        <FaVideo className="icon" />
      </div>
    </div>
  );
};

export default ControlPanel;
