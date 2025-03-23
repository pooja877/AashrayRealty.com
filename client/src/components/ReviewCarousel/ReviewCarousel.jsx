import { useState, useEffect } from "react";
import "./reviewCarousel.css"; // Import CSS

const ReviewCarousel = ({ propertyId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
      const reviewsPerPage = 3; 

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/review/${propertyId}`);
        const data = await res.json();
        setReviews(data.reviews);
        setAverageRating(data.averageRating);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [propertyId]);

  // Function to navigate to next reviews
  const displayedReviews = [...reviews].reverse().slice(startIndex, startIndex + reviewsPerPage);

    // Handle Next Slide
    const handleNext = () => {
        if (startIndex + reviewsPerPage < reviews.length) {
            setStartIndex(startIndex + 1);
        }
    };

    // Handle Previous Slide
    const handlePrevious = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };
  return (
    <div className="review-container">
      {/* Display Overall Average Rating */}
      <h2 className="average-rating">Overall Rating: ⭐ {averageRating}</h2>

      {/* Show Only 3 Reviews at a Time */}
        {/* Navigation Buttons */}
        <div className="testimonials-nav">
                <button 
                    className="nav-btn" 
                    onClick={handlePrevious} 
                    disabled={startIndex === 0}
                >
                    <i className="fas fa-chevron-left"></i> Previous
                </button>

                <button 
                    className="nav-btn" 
                    onClick={handleNext} 
                    disabled={startIndex + reviewsPerPage >= reviews.length}
                >
                    Next <i className="fas fa-chevron-right"></i>
                </button>
            </div>
      <div className="reviews">
        {displayedReviews.map((review) => (
          <div key={review._id} className="review-card">
           <div className="photname">
           <img src={review.userId.avatar} alt={review.userId.username} className="user-photo" />
           <strong>{review.userId.username}</strong>
           </div>
            <div className="review-text">
             
              <p>⭐ {review.rating}</p>
              <p>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

    
    </div>
  );
};

export default ReviewCarousel;
