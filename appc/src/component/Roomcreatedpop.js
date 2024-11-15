import React from 'react';
import LinkBtn from '../assets/link-btn.png';
import ContactIconA from '../assets/bluewhatsapp.png';
import ContactIconB from '../assets/blueinstagram.png';
import ContactIconC from '../assets/bluelinkedin.png';
import ContactIconD from '../assets/bluegmail.png';
import '../home.css';

export default function Roomcreatedpop({ roomId }) {
  // Construct the room link URL dynamically
  const roomLink = `https://cowatch.com/room/${roomId}`;

  // Copy link function
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(roomLink)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Failed to copy link:', err);
      });
  };

  return (
    <div className="overlay">
      <section className='Section-pop-create'>
        <div className='container-pop'>
          <div className='sub-container'>
            <p className='CreateRpop-h1 Poppins'>Your Room created successfully</p>
            <p className='CreateRpop-h2 Poppins'>Share Room Link</p>
            <div className='Share-room'>
              <input type="url" value={roomLink} readOnly />
              <button onClick={copyLinkToClipboard}>
                <img src={LinkBtn} alt="Copylink" />
              </button>
            </div>
          </div>
          <div className='Line-divisor'>
            <hr />
            <p className='Nunito'>Or Share with</p>
            <hr />
          </div>
          <div className='Social-contact'>
            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(roomLink)}`} target="_blank" rel="noopener noreferrer">
              <img src={ContactIconA} alt="WhatsApp" />
            </a>
            <a href={`https://www.instagram.com/?url=${encodeURIComponent(roomLink)}`} target="_blank" rel="noopener noreferrer">
              <img src={ContactIconB} alt="Instagram" />
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(roomLink)}`} target="_blank" rel="noopener noreferrer">
              <img src={ContactIconC} alt="LinkedIn" />
            </a>
            <a href={`mailto:?subject=Join my CoWatch room&body=${encodeURIComponent(roomLink)}`} target="_blank" rel="noopener noreferrer">
              <img src={ContactIconD} alt="Email" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
