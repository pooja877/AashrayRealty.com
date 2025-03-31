import {   useState } from "react";
import {Link} from "react-router-dom";
import './navbar.scss';
import {useSelector} from 'react-redux';
import { FaBell } from "react-icons/fa";
function Navbar()
{   
  //  const [user, setUser] = useState(null);
  //  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    // const [op, setOp] = useState(false);
    // useEffect(() => {
    //   const fetchUserAndNotifications = async () => {
    //     try {
    //       // ✅ Fetch logged-in user
    //       const userRes = await fetch("/api/user/me", { method: "GET", credentials: "include" });
    //       const userData = await userRes.json();
    //       if (userRes.ok) {
    //         setUser(userData);
    //         if (!user) return; 
    //         // ✅ Fetch notifications only if user is logged in
    //         const notifRes = await fetch(`/api/notify/${user.id}`);
    //         const notifData = await notifRes.json();
    //         setNotifications(notifData.notifications);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching user or notifications:", error);
    //     }
    //   };
  
    //   fetchUserAndNotifications();
    // }, []);
    return(
        <>
       <nav>
        {/* left side */}
       <div className="left">
            <a href="/" className='logo'>
                <img src="/logo.jpeg" alt="" />
                <p>Aashray
                <span id="realty">Realty</span> 
                </p> 
            </a>
            <a href="/">Home</a> 
            <a href="/about">About us</a>
            <a href="/contactus">Contact us</a>
            <a href="/properties">Properties</a>
       </div>

       {/* right side */}
        <div className="right">
           <FaBell size={25} style={{ cursor: "pointer" }} />
           {/* <div className="notification-icon" onClick={() => { setOp(!op); }}>
          <FaBell size={25} style={{ cursor: "pointer" }} />
          {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
        </div>

        {/* ✅ Notification Dropdown */}
        {/* {op && (
          <div className="notification-dropdown">
            {notifications.length === 0 ? (
              <p>No new notifications</p>
            ) : (
              notifications.map((n) => (
                <p key={n._id}>{n.message}</p>
              ))
            )}
          </div>
        )}  */}
          <Link to="/profile">      
              {currentUser? (<img src={currentUser.avatar||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} className="profile" />):(<p  className='register'>Sign in</p>)}
          </Link>

        {/* max-width is small */}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>  
         
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contactus">Contact</a>
          <a href="/properties">Properties</a>
          {/* <a href="/signin">Sign in</a> */}
          {currentUser? (<a href="/profile">Profile</a>):(<a href="/signin">Sign in</a>)}
        </div>
        </div>
       </nav>
        </>
    );
}
export default Navbar;
