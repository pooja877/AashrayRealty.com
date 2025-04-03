import './Profile.scss';
import {useSelector,useDispatch } from 'react-redux';
import {Link} from "react-router-dom";
import { logoutUserStart ,logoutUserSuccess,logoutUserFailure} from '../../redux/user/userSlice.js';
import Activity from '../../components/Activity/Activity.jsx';
import UserListing from '../../components/UserListing/UserListing.jsx';
// import Tools from '../../components/Tools&advice/Tools.jsx';


export default function Profile() {
    const {currentUser} = useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const handleLogOut=async ()=>{
      try{
        dispatch(logoutUserStart());
          const res=await fetch('/api/auth/logout');
          const data=res.json();
          if(data.success===false)
          {
            dispatch(logoutUserFailure(data.message));
            return;
          }
          dispatch(logoutUserSuccess(data));
      }catch(error)
      {
          dispatch(logoutUserFailure(error.message));
      }

    }
 
  // 🔹 Logout when the page is closed/refreshed
 
  
     return (
      <div className="profilecontainer">
    <div className='infocontainer'>
      {/*  user info */}
           <div className="containerDetails">
           <img className="profile" src={currentUser.avatar||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}/>
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
          <Activity/>
          {/* tools & advices */}
          {/* <Tools/> */}
     {/* Account Setting delete account */}
     <Link to="/setting">
        <div className="account_setting" >
         <img className="image"src="./user-delete_1.png" alt="delete" />
         <div className="acproset">
         <p className='writetitledelete'>Delete my account</p> 
         <img  className="image"src="./arrow-circle-right_2.png" alt="arrow"/>
         </div>
        </div>
        </Link>

        {/* Logout */}
            <button onClick={handleLogOut} className='btnlogOut'>
            <img className="image"src="logout_1.png" alt="" />
            Log Out
            </button>
            <UserListing userId={currentUser._id}/> 
      </div>
     
      </div>
  )
}
