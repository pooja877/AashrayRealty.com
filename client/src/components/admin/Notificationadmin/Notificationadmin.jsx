// import { useEffect, useState } from "react";
// import AdminNavbar from "../adminNavbar/AdminNavbar";
// import "./Notificationadmin.css";

// export default function Notificationadmin() {
//   const [notifications, setNotifications] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("contact");
//   const [reply, setReply] = useState("");

//   const fetchNotifications = async (category) => {
//     try {
//       const res = await fetch(`/api/contact/category/${category}`, { method: "GET" });
//       const data = await res.json();
//       setNotifications(data);
//      console.log(data);
//     } catch (error) {
//       console.error("Error fetching notifications:", error);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications(selectedCategory);  // Fetch notifications on component mount
//   }, [selectedCategory]);  // Re-fetch when the selected category changes

//   const handleReply = async (id) => {
//     try {
//       const res = await fetch("/api/contact/reply", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, reply }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("Reply sent successfully!");
//         setNotifications(
//           notifications.map((msg) => (msg._id === id ? { ...msg, replied: true } : msg))
//         );
//         setReply("");
//       } else {
//         alert(data.error || "Failed to send reply.");
//       }
//     } catch (error) {
//       console.error("Error sending reply:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`/api/contact/delete/${id}`, { method: "DELETE" });
//       const data = await res.json();
//       if (res.ok) {
//         alert("Message deleted successfully!");
//         setNotifications(notifications.filter((msg) => msg._id !== id));
//       } else {
//         alert(data.error || "Failed to delete message.");
//       }
//     } catch (error) {
//       console.error("Error deleting message:", error);
//     }
//   };

//   const handleDeleteAll = async () => {
//     try {
//       const res = await fetch(`/api/contact/deleteAll/${selectedCategory}`, { method: "DELETE" });
//       const data = await res.json();
//       if (res.ok) {
//         alert(`All messages in the "${selectedCategory}" category deleted successfully!`);
//         setNotifications([]); // Clear the notifications state
//       } else {
//         alert(data.error || "Failed to delete all messages.");
//       }
//     } catch (error) {
//       console.error("Error deleting all messages:", error);
//     }
//   };

//   return (
//     <>
//       <AdminNavbar />
//       <div className="mainmessagecontainerr">
//         <div className="admin-messages">
//           <div className="messages-header">
//             <h2>All Notifications</h2>
//           </div>

//           <div className="category-buttons">
//             {["contact", "book", "unpaid", "rentpaid","feedback", "cancle", "newUser","clickNotify","userUploadProperty"].map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={selectedCategory === category ? "active-category" : ""}
//               >
//                 {category.charAt(0).toUpperCase() + category.slice(1)} Messages
//               </button>
//             ))}
//           </div>

//           <div className="deleteallcontainer">
//             <p>Total: {notifications.length} messages</p>
//             <button className="delete-all-btn" onClick={handleDeleteAll}>
//               Delete All 
//             </button>
//           </div>
//             <div className="notification-list">
//             {notifications.length > 0 ? (
//               notifications.map((msg) => (
//                 <div key={msg._id} className="notification-item">
//                   <p><strong>User Email:</strong> {msg.userId?.email}</p>
//                   <p><strong>Message:</strong> {msg.message}</p>
//                   <p><strong>Category:</strong> {msg.category}</p>
//                   <p><strong>Sent:</strong> {new Date(msg.createdAt).toLocaleString()}</p>

//                   {selectedCategory === "contact" && !msg.replied && (
//                     <div>
//                       <textarea 
//                         value={reply} 
//                         onChange={(e) => setReply(e.target.value)} 
//                         placeholder="Write your reply..." 
//                       />
//                       <button onClick={() => handleReply(msg._id)} className="btnadmin">
//                         Send Reply
//                       </button>
//                     </div>
//                   )}

//                   <div>
//                     <button onClick={() => handleDelete(msg._id)} className="btndelte">
//                       Delete
//                     </button>
//                   </div>

//                   {msg.replied && <p className="replied-text">✅ Replied</p>}
//                 </div>
//               ))
//             ) : (
//               <p>No notifications found.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import { useEffect, useState } from "react";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import "./Notificationadmin.css";

export default function Notificationadmin() {
  const [notifications, setNotifications] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("contact");
  const [reply, setReply] = useState("");
  const [showCategories, setShowCategories] = useState(false); // 👈 New toggle state

  const fetchNotifications = async (category) => {
    try {
      const res = await fetch(`/api/contact/category/${category}`, { method: "GET" });
      const data = await res.json();
      setNotifications(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications(selectedCategory);
  }, [selectedCategory]);

  const handleReply = async (id) => {
    try {
      const res = await fetch("/api/contact/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, reply }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Reply sent successfully!");
        setNotifications(
          notifications.map((msg) => (msg._id === id ? { ...msg, replied: true } : msg))
        );
        setReply("");
      } else {
        alert(data.error || "Failed to send reply.");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/contact/delete/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        alert("Message deleted successfully!");
        setNotifications(notifications.filter((msg) => msg._id !== id));
      } else {
        alert(data.error || "Failed to delete message.");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      const res = await fetch(`/api/contact/deleteAll/${selectedCategory}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok) {
        alert(`All messages in the "${selectedCategory}" category deleted successfully!`);
        setNotifications([]);
      } else {
        alert(data.error || "Failed to delete all messages.");
      }
    } catch (error) {
      console.error("Error deleting all messages:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="mainmessagecontainerr">
        <div className="admin-messages">
          <div className="messages-header">
            <h2>All Notifications</h2>
          </div>

          {/* 🔘 Toggle Button */}
          <div className="category-toggle-container">
            <button
              className="toggle-category-btn"
              onClick={() => setShowCategories(!showCategories)}
            >
              {showCategories ? "Hide Categories" : "Show Categories"}
            </button>

            {/* 🔘 Category Buttons */}
            {showCategories && (
              <div className="category-buttons">
                {[
                  "contact",
                  "book",
                  "unpaid",
                  "rentpaid",
                  "feedback",
                  "newUser",
                  "clickNotify",
                  "userUploadProperty",
                ].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "active-category" : ""}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)} Messages
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="deleteallcontainer">
            <p>Total: {notifications.length} messages</p>
            <button className="delete-all-btn" onClick={handleDeleteAll}>
              Delete All
            </button>
          </div>

          <div className="notification-list">
            {notifications.length > 0 ? (
              notifications.map((msg) => (
                <div key={msg._id} className="notification-item">
                  <p><strong>User Email:</strong> {msg.userId?.email}</p>
                  <p><strong>Message:</strong> {msg.message}</p>
                  <p><strong>Category:</strong> {msg.category}</p>
                  <p><strong>Sent:</strong> {new Date(msg.createdAt).toLocaleString()}</p>

                  {selectedCategory === "contact" && !msg.replied && (
                    <div>
                      <textarea
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        placeholder="Write your reply..."
                      />
                      <button onClick={() => handleReply(msg._id)} className="btnadmin">
                        Send Reply
                      </button>
                    </div>
                  )}

                  <div>
                    <button onClick={() => handleDelete(msg._id)} className="btndelte">
                      Delete
                    </button>
                  </div>

                  {msg.replied && <p className="replied-text">✅ Replied</p>}
                </div>
              ))
            ) : (
              <p>No notifications found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
