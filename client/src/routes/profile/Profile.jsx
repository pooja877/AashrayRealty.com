import './Profile.scss';
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";
export default function Profile() {
    const {currentUser} = useSelector((state)=>state.user);
    
     return (
      
    <div className='infocontainer'>
      {/*  user info */}
           <div className="containerDetails">
           <img className="profile"src={currentUser.avatar}/>
           <div className="info">
           <h2 id="username">{currentUser.username}</h2>
           <p id='email'>{currentUser.email}</p>
           </div>
            <Link to="/edit">
            <button className='btnEdit'>Edit</button>
            </Link>
           </div>
           <hr/>
        {/* My Activity */}
           <h2>My Activity</h2>
          <div className="myActivity">
         
            <div className="activity">
              <img className="image"src="./house-heart-fill_1.png" />
              <p>Saved Properties</p>
              <span>00</span>
            </div>
            <div className="activity">
              <img className="image" src="./house-circle-check_1.png" />
              <p>Seen Properties</p>
              <span>00</span>
            </div>
          </div>
          {/* tools & advices */}
          <div className="tools">
            <img src="" alt="" />
            <h2>Tools & Advices</h2>
            <img src="" alt="" />
          </div>
     {/* Account Setting */}
        <div className="account_setting">
         <img className="image"src="./user-delete_1.png" alt="delete" />
         <p>Delete my account</p>
          <img  className="image"src="./arrow-circle-right_2.png" alt="arrow"/>
        </div>
        {/* Logout */}
            <button className='btnlogOut'>
            <img className="image"src="logout_1.png" alt="" />
            Log Out
            </button>
      </div>
  )
}
