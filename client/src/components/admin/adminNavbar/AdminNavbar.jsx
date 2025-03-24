
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [unansweredCount, setUnansweredCount] = useState(0);

  // Fetch the number of unanswered messages
  useEffect(() => {
    const fetchUnansweredMessages = async () => {
      try {
        const res = await fetch("/api/contact/unanswered", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUnansweredCount(data.count);
        }
      } catch (error) {
        console.error("Error fetching unanswered messages", error);
      }
    };

    fetchUnansweredMessages();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  return (
    <>
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
          <div className="notification-icon" onClick={() => navigate("/admin/messages")}>
            <FaBell size={30} style={{ cursor: "pointer" }} />
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
            <a href="/admin/properties">Properties</a>
            <a href="/admin/news">News</a>
            <button className="logoutadmin" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
    </>
  );
}
