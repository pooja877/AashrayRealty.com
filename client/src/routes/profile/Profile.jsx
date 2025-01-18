import './Profile.scss';
import { useSelector } from 'react-redux';
import {useRef} from 'react';
export default function Profile() {
    const fileRef=useRef(null);
    const {currentUser}=useSelector((state)=>state.user);
     return (
    <div className='infoContainer'>
        <h1>Profile</h1>
        <form action="">
            <input type='file' ref={fileRef} hidden accept='image/*'/>
            <img src={currentUser.avatar} onClick={()=>fileRef.current.click()}/>
            <input type="text" placeholder='Username' id="username"/>
            <input type="email" placeholder='Email' id='email' />
            <input type="password" placeholder='Password' id='password' />
            <button className='btnUpdate'>Update</button>
        </form>
        <div className="setting">
            <span>Delete Account</span>
            <span>Sign Out</span>
        </div>

    </div>
  )
}
