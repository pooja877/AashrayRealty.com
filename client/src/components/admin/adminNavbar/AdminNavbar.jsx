import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBell, FaGlobe, FaSignOutAlt } from "react-icons/fa";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [unansweredCount, setUnansweredCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const lowerQuery = query.trim().toLowerCase();
  
    // Smart redirects based on input
    if (lowerQuery === "users") {
      navigate("/admin/users");
    } else if (lowerQuery === "userproperties") {
      navigate("/admin/userProperties");
    } else if (lowerQuery === "properties") {
      navigate("/admin/properties");
    } else if (lowerQuery === "rented" || lowerQuery === "rentedproperties") {
      navigate("/admin/allrentedProperties");
    } else if (lowerQuery === "news") {
      navigate("/admin/news");
    } else if (lowerQuery === "bookings") {
      navigate("/admin/bookings");
    } else if (lowerQuery === "unpaid" || lowerQuery === "unpaiduser") {
      navigate("/admin/unPaidUser");
    } else if (lowerQuery === "dashboard") {
      navigate("/admin/dashboard");
    } else if (lowerQuery === "add property") {
      navigate("/admin/addProperty");
    } 
    else if (lowerQuery === "update news") {
      navigate("/admin/news/updatenews/:id");
    } else if (lowerQuery === "update Property") {
      navigate("/admin/property/updateProperty/:id");
    } else if (lowerQuery === "add news") {
      navigate("/admin/addNews");
    } else if (lowerQuery === "giverent") {
      navigate("/admin/bookings");
    } 
  
    else {
      // fallback to search page with query param
      navigate(`/admin/search?q=${lowerQuery}`);
    }
  };
  
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
          <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
          
        </div>

        {/* Right Side */}
        <div className="adminright">
          {/* Notification Bell with Message Count */}
           

          <div className="notificationicon" onClick={handleBellClick}>
           <Link to="/admin/messages"> <FaBell size={25} style={{ cursor: "pointer" }} /> </Link>
            {unansweredCount > 0 && (
              <span className="notificatiobadge">
                {unansweredCount > 5 ? "5+" : unansweredCount}
              </span>
            )}
          </div>
          <div className="goweb-wrapper">
  <a href="/" target="_blank" rel="noopener noreferrer">
    <FaGlobe className="goweb-icon" />
    <span className="goweb-tooltip">Go to Website</span>
  </a>
</div>

          <div className="logout-wrapper">
  <FaSignOutAlt className="logout-icon" onClick={handleLogout} />
  <span className="logout-tooltip">Logout</span>
</div>

          {/* Hamburger Menu for Small Screens */}
          <div className="menuIcon">
            <img src="/menu.png" alt="Menu" onClick={() => setOpen((prev) => !prev)} />
          </div>

          <div className={open ? "menu active" : "menu"}>
            {/* <a href="/" className="goweb">Go to Website</a> */}
            {/* <a href="/admin/dashboard">Dashboard</a> */}
            <hr />
            <a href="/admin/users">Users</a>
            <hr />
          <a href="/admin/userProperties">UserProperties</a>
          <hr />
          <a href="/admin/properties">Properties</a>
          <hr />

            <a href="/admin/allrentedProperties">RentedProperties</a> 
          <hr />

            <a href="/admin/news">News</a>
          <hr />

            {/* <a href="/admin/bookings/all">Bookings</a> */}
          {/* <hr /> */}

            <a href="/admin/unPaidUser">UnPaidUser</a>
          <hr />

            {/* <button className="logoutadmin" onClick={handleLogout}>Logout</button> */}
          </div>
        </div>
      </nav>
    </>
  );
}
