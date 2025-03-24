import { useEffect, useState } from "react";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import "./AdminMessages.css";

const AdminMessage = () => {
    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch("/api/contact/getmessage", { method: "GET", credentials: "include" });
                const data = await res.json();
                if (res.ok) setMessages(data);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, []);

    const handleReply = async (id) => {
        try {
            const res = await fetch("/api/contact/reply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id, reply }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Reply sent successfully!");
                setMessages(messages.map((msg) => (msg._id === id ? { ...msg, replied: true } : msg)));
                setReply("");
            } else {
                alert(data.error || "Failed to send reply.");
            }
        } catch (error) {
            console.error("Error sending reply:", error);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this message?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/contact/delete/${id}`, { method: "DELETE", credentials: "include" });
            if (res.ok) {
                alert("Message deleted successfully!");
                setMessages(messages.filter((msg) => msg._id !== id));
            } else {
                alert("Failed to delete message.");
            }
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

    // ✅ **Delete All Messages Function**
    const handleDeleteAll = async () => {
        if (messages.length === 0) return alert("No messages to delete!");
        if (!window.confirm("Are you sure you want to delete all messages?")) return;

        try {
            const res = await fetch("/api/contact/delete-multiple", { 
                method: "DELETE", 
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ids: messages.map(msg => msg._id) })
            });

            if (res.ok) {
                alert("All messages deleted!");
                setMessages([]);
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
                    {/* Title with Delete All Button */}
                    <div className="messages-header">
                        <h2>Contact Messages</h2>
                        <button onClick={handleDeleteAll} className="delete-all-btn">Delete All</button>
                    </div>

                    {messages.length > 0 ? (
                        messages.map((msg) => (
                            <div key={msg._id} className="message-card">
                                <h4>{msg.subject}</h4>
                                <p>{msg.message}</p>
                                <p><strong>From:</strong> {msg.userId.name} ({msg.userId.email})</p>
                                <p><strong>Sent:</strong> {new Date(msg.createdAt).toLocaleString()}</p>

                                {msg.replied ? (
                                    <p className="replied-text">✅ Replied</p>
                                ) : (
                                    <div>
                                        <textarea 
                                            className="messagearea" 
                                            value={reply} 
                                            onChange={(e) => setReply(e.target.value)} 
                                            placeholder="Write your reply..." 
                                        />
                                        <button onClick={() => handleReply(msg._id)} className="btnadmin">Send Reply</button>
                                    </div>
                                )}
                                <button onClick={() => handleDelete(msg._id)} className="deleteeebtn">Delete</button>
                            </div>
                        ))
                    ) : (
                        <p>No messages found.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminMessage;
