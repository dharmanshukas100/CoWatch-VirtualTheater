// import React from 'react'
// import LinkBtn from '../assets/link-btn.png'
// import ContactIconA from '../assets/bluewhatsapp.png'
// import ContactIconB from '../assets/blueinstagram.png'
// import ContactIconC from '../assets/bluelinkedin.png'
// import ContactIconD from '../assets/bluegmail.png'

// export default function Roomcreatedpop() {
//   return (
//     <>
//     <section className='Section-pop-create'>
//       <div className='container-pop'>
//         <div className='sub-container'>
//           <p className='CreateRpop-h1 Poppins'>Your Room created  successfully</p>
//           <p className='CreateRpop-h2 Poppins'>Share Room Link</p>
//           <div className='Share-room'>
//             <input type="url" placeholder='https://cowatch.com/room/abc123....'/>
//             <a href="www.google.com"><img src={LinkBtn} alt="Copylink" /></a>
//           </div>
//         </div>
//         <div className='Line-divisor'>
//           <hr />
//           <p className='Poppins'>Or Share with</p>
//           <hr />
//         </div>
//         <div className='Social-contact'>
//             <a href="www.google.com"><img src={ContactIconA} alt="" /></a>
//             <a href="www.google.com"><img src={ContactIconB} alt="" /></a>
//             <a href="www.google.com"><img src={ContactIconC} alt="" /></a>
//             <a href="www.google.com"><img src={ContactIconD} alt="" /></a>
//         </div>
//       </div>
//     </section>

      
//     </>
//   )
// }


import React from 'react';
import LinkBtn from '../assets/link-btn.png';
import ContactIconA from '../assets/bluewhatsapp.png';
import ContactIconB from '../assets/blueinstagram.png';
import ContactIconC from '../assets/bluelinkedin.png';
import ContactIconD from '../assets/bluegmail.png';
import '../home.css';

export default function Roomcreatedpop() {
  return (
    <div className="overlay">
      <section className='Section-pop-create'>
        <div className='container-pop'>
          <div className='sub-container'>
            <p className='CreateRpop-h1 Poppins'>Your Room created successfully</p>
            <p className='CreateRpop-h2 Poppins'>Share Room Link</p>
            <div className='Share-room'>
              <input type="url" placeholder='https://cowatch.com/room/abc123....'/>
              <a href="www.google.com"><img src={LinkBtn} alt="Copylink" /></a>
            </div>
          </div>
          <div className='Line-divisor'>
            <hr />
            <p className='Nunito'>Or Share with</p>
            <hr />
          </div>
          <div className='Social-contact'>
            <a href="www.google.com"><img src={ContactIconA} alt="" /></a>
            <a href="www.google.com"><img src={ContactIconB} alt="" /></a>
            <a href="www.google.com"><img src={ContactIconC} alt="" /></a>
            <a href="www.google.com"><img src={ContactIconD} alt="" /></a>
          </div>
        </div>
      </section>
    </div>
  );
}
