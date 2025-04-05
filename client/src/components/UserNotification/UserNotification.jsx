import { useEffect, useState } from "react";
import "./UserNotification.css";

export default function UserNotification() {
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.error("Not logged in", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;
    console.log(user);
    const fetchNotifications = async () => {
      try {
        const res = await fetch(`/api/user-notifications/${user.id}`);
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, [user]);

  const deleteNotification = async (id) => {
    try {
      const res = await fetch(`/api/user-notifications/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setNotifications(notifications.filter((notification) => notification._id !== id));
      }
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const deleteAllNotifications = async () => {
    try {
      const res = await fetch("/api/user-notifications", {
        method: "DELETE",
      });
      if (res.ok) {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error deleting all notifications:", error);
    }
  };

  return (
   
      <div className="maindvfornotify">
        <div className="usernotify-container">
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <>
          <button className="usernotify-delete-all-btn" onClick={deleteAllNotifications}>
            Delete All Notifications
          </button>
          {notifications.map((notification) => (
            <div key={notification._id} className={`usernotify-item ${notification.read ? "read" : "unread"}`}>
              <p>{notification.message}</p>
              <button className="usernotify-delete-btn" onClick={() => deleteNotification(notification._id)}>
                Delete
              </button>
            </div>
          ))}
        </>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
    </div>
    
  );
}
