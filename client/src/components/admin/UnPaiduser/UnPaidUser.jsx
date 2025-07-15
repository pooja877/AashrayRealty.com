import { useEffect, useState } from "react";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import './UnPaidUser.css'

const UnPaidUser = () => {
  const [unpaidUsers, setUnpaidUsers] = useState([]);
  
  useEffect(() => {
    const fetchUnpaidUsers = async () => {
      try {
        const response = await fetch("/api/unpaid/unpaid-users");
        const data = await response.json();
        if (response.ok) {
          setUnpaidUsers(data);
          console.log(data);
        } else {
          console.error(data.message || "Failed to fetch unpaid users");

        }
      } catch (error) {
        console.error("Error fetching unpaid users:", error);
        console.log(error);
      }
    };

    fetchUnpaidUsers();
  }, []);

  const sendReminder = async (userId) => {
    try {
      const response = await fetch(`/api/unpaid/send-reminder/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(`Reminder sent! Payment Link: ${data.paymentLink}`);
        window.open(data.paymentLink, "_blank"); // Open link in new tab
      } else {
        alert("Failed to send reminder");
      }
    } catch (error) {
      console.error("Error sending reminder:", error);
      alert("Something went wrong");
    }
  };
  
  // Function to delete unpaid user
  const deleteUnpaidUser = async (userId) => {
    try {
      const response = await fetch(`/api/unpaid/unpaiduser/${userId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      
      if (response.ok) {
        // Remove the deleted user from the state
        setUnpaidUsers(unpaidUsers.filter((user) => user.userId._id !== userId));
        alert("Unpaid user deleted successfully");
      } else {
        alert(data.message || "Failed to delete unpaid user");
      }
    } catch (error) {
      console.error("Error deleting unpaid user:", error);
    }
  };

  return (
     <>
       <AdminNavbar/>
    <div className="mainAllunpaid">
      <h1 className="htforunpaid">Rent Unpaid Users</h1>
      {unpaidUsers.length === 0 ? (
        <p>No unpaid users found.</p>
      ) : (
        <div className="unpaid-users-container">
          {unpaidUsers.map((user) => (
            <div key={user._id} className="unpaid-user-card">
              <h2>{user.userId.username}</h2>  
              <p>Email: {user.userId.email}</p> 
              <p>Rent Amount: ₹{user.rentAmount}</p>
              <p>Due Date: {new Date(user.dueDate).toLocaleDateString()}</p>
              <p>Current Date: {new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
              <button className="reminder-btn" onClick={() => sendReminder(user.userId?._id)}>
              Send Reminder
            </button>
              <button onClick={() => deleteUnpaidUser(user.userId._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default UnPaidUser;
