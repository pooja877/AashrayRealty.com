import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [unansweredCount, setUnansweredCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch unread notifications count
  useEffect(() => {
    const fetchUnansweredMessages = async () => {
      try {
        const res = await fetch("/api/contact/unread-notifications", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          setUnansweredCount(data.count);

          // Show popup only if there are unanswered messages
          if (data.count > 0) {
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 5000); // Auto-hide after 5 sec
          }
        }
      } catch (error) {
        console.error("Error fetching unread notifications", error);
      }
    };

    fetchUnansweredMessages();
  }, []);

  // Function to handle the click on the bell icon
  const handleBellClick = async () => {
    try {
      const res = await fetch("/api/contact/mark-notifications-read", {
        method: "POST",
        credentials: "include", // Include credentials if needed
      });

      if (res.ok) {
        // If successful, fetch the updated count
        const data = await res.json();
        console.log(data.message);  // Log success message
        setUnansweredCount(0);  // Reset the count after marking as read
      }
    } catch (error) {
      console.error("Error marking notifications as read", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <>
      {/* 🔔 Notification Popup Near Bell Icon */}
      {showPopup && (
        <div className="popup-notification">
          <p>You have {unansweredCount} unanswered messages!</p>
        </div>
      )}

      <nav className="head">
        {/* Left Side */}
        <div className="adminleft">
          <a href="/admin/dashboard" className="logo">
            <img src="/logo.jpeg" alt="Aashray Realty Logo" />
            <p>
              Aashray<span id="realty">Realty</span>
            </p>
          </a>
        </div>

        {/* Right Side */}
        <div className="adminright">
          {/* Notification Bell with Message Count */}
          <div className="notification-icon" onClick={handleBellClick}>
           <Link to="/admin/messages"> <FaBell size={25} style={{ cursor: "pointer" }} /> </Link>
            {unansweredCount > 0 && (
              <span className="notification-badge">
                {unansweredCount > 5 ? "5+" : unansweredCount}
              </span>
            )}
          </div>

          {/* Hamburger Menu for Small Screens */}
          <div className="menuIcon">
            <img src="/menu.png" alt="Menu" onClick={() => setOpen((prev) => !prev)} />
          </div>

          <div className={open ? "menu active" : "menu"}>
            <a href="/" className="goweb">Go to Website</a>
            <a href="/admin/dashboard">Dashboard</a>
            <a href="/admin/users">Users</a>
            <a href="/admin/allrentedProperties">RentedProperties</a>
            <a href="/admin/userProperties">UserProperties</a>
            <a href="/admin/properties">Properties</a>
            <a href="/admin/news">News</a>
            <a href="/admin/bookings">Bookings</a>
            <a href="/admin/unPaidUser">UnPaidUser</a>
            <button className="logoutadmin" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </>
  );
}
