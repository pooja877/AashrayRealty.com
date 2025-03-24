import { useState, useEffect } from "react";
import './Contact.css'
export default function ContactUs() {
   const [formData, setFormData] = useState({ subject: "", message: "" });
      const [user, setUser] = useState(null);
  
      // Fetch logged-in user
      useEffect(() => {
          const fetchUser = async () => {
              try {
                  const res = await fetch("/api/user/me", { method: "GET", credentials: "include" });
                  const data = await res.json();
                  if (res.ok) setUser(data);
              } catch (error) {
                  console.error("Not logged in", error);
              }
          };
          fetchUser();
      }, []);
  
      const handleChange = (e) => {
          setFormData({ ...formData, [e.target.id]: e.target.value });
      };
  
      const handleSubmit = async (e) => {
          e.preventDefault();
          if (!user) {
              alert("Please log in to send a message.");
              return;
          }
  
          try {
              const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  credentials: "include",
                  body: JSON.stringify(formData),
              });
  
              const data = await res.json();
              if (res.ok) {
                  alert("Message sent successfully!");
                  setFormData({ subject: "", message: "" });
              } else {
                  alert(data.error || "Failed to send message.");
              }
          } catch (error) {
              console.error("Error sending message:", error);
          }
      };
  return (
<div className="mainconusercontain">
<div className="contactuser-container">
      {/* Header Section */}
      <div className="contactuser-header">
        <h2>CONTACT US</h2>
      </div>

      {/* Contact Details & Form Section */}
      <div className="contactuser-content">
        {/* Left Side: Contact Details */}
        <div className="contactuser-info">
          <div className="contactuser-box">
            <span className="contactuser-icon">📍</span>
            <div>
              <h3>Office Address</h3>
              <p>1003 One World West, Iscon Ambli Road, Ahmedabad, Gujarat 380058</p>
            </div>
          </div>

          <div className="contactuser-box">
            <span className="contactuser-icon">📞</span>
            <div>
              <h3>Phone Number</h3>
              <p>Contact: +91 97235 16494 </p>
            </div>
          </div>

          <div className="contactuser-box">
            <span className="contactuser-icon">📧</span>
            <div>
              <h3>Email Address</h3>
              <p>ashish.yadav@aashrayrealty.com</p>
              <p>http://aashrayRealty.in</p>
              <p>Hours: Monday-Friday: 9am-6pm, Saturday: 10am-4pm</p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="contactuser-form">
        {user ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="subject">Subject</label>
                                        <input type="text" className="contactuser-input" id="subject" placeholder="Enter Subject (e.g., Property Inquiry...)" value={formData.subject} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea id="message" rows="4" className="contactuser-textarea" placeholder="How can we help you?" value={formData.message} onChange={handleChange} required />
                                    </div>
                                    <button type="submit" className="contactuser-btn">Send Message</button>
                                </form>
                            ) : (
                                <p>Please log in to send a message.</p>
                            )}
        </div>
      </div>
    </div>
</div>
  );
}
