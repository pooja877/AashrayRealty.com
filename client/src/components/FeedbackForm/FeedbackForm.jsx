import './FeedbackForm.css'
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Footercompo from '../Footer/Footercompo';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ rating: 0, comments: "" });
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate=useNavigate();

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
 

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!user) {
      setMessage("You must be logged in to submit feedback.");
      return;
    }
   console.log(user.id);
    try {
      const res = await fetch("/api/feedback/feed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...formData,userId:user.id}),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Feedback submitted successfully!");
        alert("Feedback submitted successfully!");
        navigate('/');
       
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setMessage("Error submitting feedback",error);
    }
  };

  return (
    <div className="mainfeed">
   <div className="mainfeedbackcontain">
     <div className="feedback-container">
      <h2>Feedback Form</h2>
      {message && <p className="message">{message}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="rating-container">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={formData.rating >= star ? "star selected" : "star"}
              onClick={() => handleRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          name="comments"
          placeholder="Your Review"
          value={formData.comments}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit" disabled={!user}>
          Submit
        </button>
      </form>

      {!user && <p className="notlogged-in">Please log in to submit feedback.</p>}
    </div>
 
   </div>
   <Footercompo/>
   </div>
  );
};

export default FeedbackForm;
