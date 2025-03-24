import { useState, useEffect } from "react";
import "./ContactUs.css";

const ContactUs = () => {
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
        <section id="contact" className="contact-section">
            <div className="container">
                <div className="contact-wrapper">
                    <div className="contact-info">
                        <h2 className="contact-title">Get in Touch</h2>
                        <p className="contact-text">Have questions about our properties or services? Contact us today and our expert team will be happy to assist you.</p>
                        <div className="contact-details">
                            <h3>Our Office</h3>
                            <p>1003 One World West, Iskcon, Ambli, Ahmedabad 380058</p>
                        </div>
                        <div className="contact-details">
                            <h3>Contact Information</h3>
                            <p>Contact no: +91 97235 16494</p>
                            <p>Email: aashish.yadav@aashrayrealty.com</p>
                            <p>Hours: Monday-Friday: 9am-6pm, Saturday: 10am-4pm</p>
                        </div>
                    </div>

                    <div className="contact-form-wrapper">
                        <div className="form-container">
                            <h3>Send Us a Message</h3>
                            {user ? (
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="subject">Subject</label>
                                        <input type="text" id="subject" placeholder="Enter Subject (e.g., Property Inquiry...)" value={formData.subject} onChange={handleChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea id="message" rows="4" placeholder="How can we help you?" value={formData.message} onChange={handleChange} required />
                                    </div>
                                    <button type="submit" className="submit-btn">Send Message</button>
                                </form>
                            ) : (
                                <p>Please log in to send a message.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
