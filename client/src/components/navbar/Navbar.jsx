
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
          <a href="/" className="logo" >
            <img src="/logo.jpeg" alt="Aashray Realty" />
            <p>Aashray<span id="realty">Realty</span></p>
          </a>
          <a href="/" className="atag">Home</a>
          <a href="/about" className="atag">About us</a>
          <a href="/contactus" className="atag">Contact us</a>
          <a href="/properties" className="atag">AashrayProperties </a>
          <a href="/userproperties" className="atag">UserProperties </a>
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