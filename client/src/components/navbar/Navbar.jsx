
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import './navbar.scss';
// import { useSelector } from 'react-redux';
// import { FaBell } from "react-icons/fa";

// function Navbar() {
//   const { currentUser } = useSelector((state) => state.user);
//   const navigate = useNavigate();  // Hook to programmatically navigate
//   const [open, setOpen] = useState(false);

//   const handleBellClick = () => {
//     // Navigate to the notification page for the current user
//     if (currentUser) {
//       navigate(`/Notification/${currentUser._id}`);
//     }
//   };

//   return (
//     <>
//       <nav>
//         {/* left side */}
//         <div className="left">
//           <a href="/" className="logo">
//             <img src="/logo.jpeg" alt="" />
//             <p>Aashray
//               <span id="realty">Realty</span>
//             </p>
//           </a>
//           <a href="/">Home</a>
//           <a href="/about">About us</a>
//           <a href="/contactus">Contact us</a>
//           <a href="/properties">Properties</a>
//         </div>

//         {/* right side */}
//         <div className="right">
//           <FaBell
//             size={25}
//             style={{ cursor: "pointer" }}
//             onClick={handleBellClick}  // Handle bell click
//           />
//           <Link to="/profile">
//             {currentUser ? (
//               <img
//                 src={currentUser.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
//                 className="profile"
//                 alt="profile"
//               />
//             ) : (
//               <p className="register">Sign in</p>
//             )}
//           </Link>

//           {/* max-width is small */}
//           <div className="menuIcon">
//             <img
//               src="/menu.png"
//               alt=""
//               onClick={() => setOpen((prev) => !prev)}
//             />
//           </div>
//           <div className={open ? "menu active" : "menu"}>
//             <a href="/">Home</a>
//             <a href="/about">About</a>
//             <a href="/contactus">Contact</a>
//             <a href="/properties">Properties</a>
//             {currentUser ? (<a href="/profile">Profile</a>) : (<a href="/signin">Sign in</a>)}
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Navbar;
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBell } from "react-icons/fa";
import "./navbar.scss";

function Navbar() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/user-notifications/unread/${currentUser?._id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setNotificationCount(data.count);
          if (data.count > 0) {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 5000);
          }
        }
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };
    if (currentUser) fetchNotifications();
  }, [currentUser]);

  const handleBellClick = async () => {
    if (!currentUser) return;
  
    try {
      // Mark all notifications as read
      await fetch(`/api/user-notifications/mark-read/${currentUser._id}`, {
        method: "POST",
        credentials: "include",
      });
  
      // Reset the count to 0
      setNotificationCount(0);
  
      // Redirect to notification page
      navigate(`/Notification/${currentUser._id}`);
    } catch (error) {
      console.error("Error marking notifications as read", error);
    }
  };
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!currentUser) return;
  
      try {
        const res = await fetch(`/api/user-notifications/unread/${currentUser._id}`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setNotificationCount(data.count > 0 ? data.count : 0);
        }
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };
  
    fetchNotifications();
  }, [currentUser]);

  return (
    <>
      {showPopup && (
        <div className="popup-notification">
          <p>You have {notificationCount} new notifications!</p>
        </div>
      )}
      <nav>
        <div className="left">
          <a href="/" className="logo">
            <img src="/logo.jpeg" alt="Aashray Realty" />
            <p>Aashray<span id="realty">Realty</span></p>
          </a>
          <a href="/">Home</a>
          <a href="/about">About us</a>
          <a href="/contactus">Contact us</a>
          <a href="/properties">Properties</a>
        </div>
        <div className="right">
          <div className="notification-icon" onClick={handleBellClick}>
            <FaBell size={25} style={{ cursor: "pointer" }} />
            {notificationCount > 0 && (
              <span className="notificationbadge">
                {notificationCount > 5 ? "5+" : notificationCount}
              </span>
            )}
          </div>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.avatar || "/default-avatar.png"}
                className="profile"
                alt="profile"
              />
            ) : (
              <p className="register">Sign in</p>
            )}
          </Link>
          <div className="menuIcon" onClick={() => setOpen((prev) => !prev)}>
            <img src="/menu.png" alt="Menu" />
          </div>
          <div className={open ? "menu active" : "menu"}>
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/contactus">Contact</a>
            <a href="/properties">Properties</a>
            {currentUser ? <a href="/profile">Profile</a> : <a href="/signin">Sign in</a>}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;