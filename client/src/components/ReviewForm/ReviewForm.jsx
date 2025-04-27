import { useState, useEffect } from "react";
import { useRef } from "react";
 import { useNavigate, useParams } from "react-router-dom";
import './ReviewForm.css'
import { FaTimes } from "react-icons/fa";
import Footercompo from "../Footer/Footercompo";


const ReviewForm = () => {
  const [formData, setFormData] = useState({ rating: 0, comment: "" });
  const [user, setUser] = useState(null);
  const {id:propertyId}=useParams();
  const navigate = useNavigate();

  const commentRef = useRef(null);

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

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to submit a review.");
      return;
    }
  
   const userId=user.id;
   const rating=formData.rating;
   const comment=formData.comment;
   
 
    try {
      const res = await fetch("/api/review/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId, userId, rating, comment }),
        credentials: "include",
      });
  
      const data = await res.json();
      if (res.ok) {
        alert("Review submitted successfully!");
       navigate(-1);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error submitting review.",error);
    }
  };
  

  return (
    <div className="mainrevi">
   <div className="mainrevieww">
   
     <div className="review-form">
    <div className="mainheadreview"> 
    <h2>Submit a Review</h2>
    <FaTimes className="close-button" onClick={() => navigate(-1)} /></div>
      <form onSubmit={handleSubmit}>
        <label>Rating:</label>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= formData.rating ? "star selected" : "star"}
              onClick={() => handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>

        <label>Review:</label>
        <textarea
          name="comment"
          value={formData.comment}
          placeholder="Enter Your Review for this Property"
          onChange={handleChange}
          ref={commentRef}
          required
        ></textarea>

        <button type="submit">Submit Review</button>
      </form>
    </div>
   </div>
   <Footercompo/>
   </div>
  );
};

export default ReviewForm;
