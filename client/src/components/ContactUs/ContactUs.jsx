import  { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
    };

    return (
         <section id="contact" className="contact-section">
            <div className="container">
                <div className="contact-wrapper">
                    {/* Left Section */}
                    <div className="contact-info">
                        <h2 className="contact-title">Get in Touch</h2>
                        <p className="contact-text">
                            Have questions about our properties or services? Contact us today and our expert team will be happy to assist you.
                        </p>

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

                    {/* Right Section */}
                    <div className="contact-form-wrapper">
                        <div className="form-container">
                            <h3>Send Us a Message</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        placeholder="Enter Subject (e.g., Property Inquiry...)"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        placeholder="How can we help you?"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="submit-btn">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
       
    );
};

export default ContactUs;
