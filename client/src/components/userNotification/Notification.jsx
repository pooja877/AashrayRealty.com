import { useEffect, useState } from 'react';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetch('/api/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data));
  }, []);

  const markAllAsRead = () => {
    fetch('/api/notifications/mark-as-read', { method: 'PUT' })
      .then(() => setNotifications(notifications.map(n => ({ ...n, isRead: true }))));
  };

  return (
    <div>
      <h2>Notifications</h2>
      <button onClick={markAllAsRead}>Mark All as Read</button>
      <ul>
        {notifications.map(n => (
          <li key={n._id} style={{ fontWeight: n.isRead ? 'normal' : 'bold' }}>{n.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
