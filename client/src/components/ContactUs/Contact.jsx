import  { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (name.trim() === "") {
      alert("Please enter your name.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (message.trim() === "") {
      alert("Please enter your message.");
      return;
    }

    alert("Form submitted successfully!");
  };

  return (
    <div className="contactrapper">
      <div className="contocontainer">
        <h1 className="conttitle">Contact Us</h1>
        <div className="contacinfo">
          {/* Contact Form */}
          <div className="contacform">
            <h2>Get in Touch</h2>
            <br/>
            <form onSubmit={validateForm}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit" className="contobutton">Send Message</button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="contacdetails">
            <h2>Contact Information</h2>
          
            <p><strong>Address:</strong>1003 One World West, Iskcon, Ambli, Ahmedabad 380058 </p>
            <p><strong>Phone:</strong> +91 97235 16494</p>
            <p><strong>Email:</strong>aashish.yadav@aashrayrealty.com</p>
            <p><strong>Working Hours:</strong>  Monday-Friday: 9am-6pm, Saturday: 10am-4pm</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
