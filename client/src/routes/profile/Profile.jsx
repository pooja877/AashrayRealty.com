import { useState } from 'react';
import './Profile.scss';
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";
export default function Profile() {
    const {currentUser} = useSelector((state)=>state.user);
    const [showTool,setShowTool]=useState(false);
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

          <div className="tools" onClick={()=>setShowTool(!showTool)} >
            <img className="image" src="./cal.jpg" alt="" />
            <p>Tools & Advices</p>
            <img className="image" src="./arrow-down-circle_1.png" alt="" />
          </div>

          {showTool && <div className="tools_">
            <div className="tool">
              <img  className="image"src="book-reader_3.png" alt="guid" />
              <p>Buying Guide</p>
            </div>
            <div className="tool">
            <img className="image"src="./emi.png" alt="EMI" />
            <p>EMI Calculator</p>
            </div>
            <div className="tool">
            <img className="image"src="./eligibility.png" alt="Aligibility" />
            <p>Eligibility Calculator</p>
            </div>
          </div>
         }

     {/* Account Setting delete account */}
     <Link to="/setting">
        <div className="account_setting">
         <img className="image"src="./user-delete_1.png" alt="delete" />
         <p>Delete my account</p>
          <img  className="image"src="./arrow-circle-right_2.png" alt="arrow"/>
        </div>
        </Link>

        {/* Logout */}
            <button className='btnlogOut'>
            <img className="image"src="logout_1.png" alt="" />
            Log Out
            </button>
      </div>
  )
}
