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

    return (
        <>
        <AdminNavbar/>
       <div className="mainmessagecontainerr">
       <div className="admin-messages">
            <h2>Contact Messages</h2>
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
                                <textarea className="messagearea" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Write your reply..." />
                                <button onClick={() => handleReply(msg._id)} className="btnadmin">Send Reply</button>
                            </div>
                        )}
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
