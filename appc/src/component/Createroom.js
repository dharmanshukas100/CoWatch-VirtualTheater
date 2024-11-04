import React from 'react'
import IconH51 from '../assets/netflix.png'
import IconH52 from '../assets/youtube.png'
import IconH53 from '../assets/DisneyPlus.png'
import IconH54 from '../assets/APrime.png'


export default function Createroom() {
  return (
    <>
    <section className='Padding'>
        <div className='Div-Room-create'>
            <div className='Inter'>
                <p className='headpara'>Room Name</p>
                <input className='headinput' type="text" name="RoomN" placeholder='Enter Your Room Name'/>
            </div>
            <div className='Inter'>
                <p className='headpara'>Select Platform for Your Room</p>
                <div className='platforms Chooseplateform'>
                    <img src={IconH51} alt="Netflix" />
                    <img src={IconH52} alt="Youtube" />
                    <img src={IconH53} alt="Hotstar" />
                    <img src={IconH54} alt="Prime" />
                </div>
                <input className='headinput' type="url" placeholder='Place Video Link...'/>
            </div>
            <div>
                <p className='headpara Inter'>Room Settings</p>
                <p className='subhead-CR Inter'>Control permissions for participants</p>
                <div className='Setting-Choice Nunito'>
                    <label className='Room-set-Label'>Allow others to control playback</label>
                    <label className="switch Room-set-Label">
                        <input type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className='Setting-Choice Nunito'>
                    <label className='Room-set-Label'>Allow others to control mic</label>
                    <label className="switch Room-set-Label">
                        <input type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className='Setting-Choice Nunito'>
                    <label className='Room-set-Label'>Allow others to control webcam</label>
                    <label className="switch Room-set-Label">
                        <input type="checkbox"/>
                        <span className="slider round"></span>
                    </label>
                </div>
           </div>

        </div>
        <div className='btn-cancel-create-room'>
            <button className='cancel-btn Nunito'>CANCEL</button>
            <button className='create-btn Nunito'>CREATE</button>
        </div>
    </section>
    </>
  )
}
