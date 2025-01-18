import './Profile.scss';
import { useSelector } from 'react-redux';
export default function Profile() {
    const {currentUser}=useSelector((state)=>state.user);
     return (
    <div className='infoContainer'>
        <h1>Profile</h1>
        <form action="">
            <img src={currentUser.avatar}/>
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
