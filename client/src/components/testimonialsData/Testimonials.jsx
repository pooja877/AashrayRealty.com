import { useEffect, useState } from "react";
import "./Testimonials.css";

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const reviewsPerPage = 3; // Show 3 testimonials at a time

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await fetch("/api/feedback/get");
                if (!response.ok) throw new Error("Failed to fetch feedback");
                const data = await response.json();
                setTestimonials(data);
            } catch (error) {
                console.error("Error fetching feedback:", error);
            }
        };

        fetchFeedback();
    }, []);

    // Get the sliding reviews window
    const displayedTestimonials = [...testimonials].reverse().slice(startIndex, startIndex + reviewsPerPage);

    // Handle Next Slide
    const handleNext = () => {
        if (startIndex + reviewsPerPage < testimonials.length) {
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
        <section className="testimonials-section">
            {/* Sliding Navigation Controls */}
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
                    disabled={startIndex + reviewsPerPage >= testimonials.length}
                >
                    Next <i className="fas fa-chevron-right"></i>
                </button>
            </div>

          <div className="feedcontain">
            <div className="text-center">
                    <h2 className="title">What Our Customers Say</h2>
                     <p className="subtitle">Honest Reviews from Our Valued Users at AashrayRealty</p>
              </div>
                

                <div className="testimonials-grid">
                    {displayedTestimonials.map(({ _id, userId, rating, comments }) => (
                        <div key={_id} className="testimonial-card">
                           <div className="infouser">
                           <img 
                                src={userId?.avatar || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
                                alt={userId?.username} 
                                className="testimonial-img" 
                            />
                            <h3 className="testimonial-name">{userId?.username || "Anonymous"}</h3>
           
                           </div>
                            <p className="testimonial-comment">{comments}</p>
                            <div className="stars">
                                {Array.from({ length: Math.floor(rating) }, (_, i) => (
                                    <span key={i}>⭐</span>
                                ))}
                                {rating % 1 !== 0 && <span>⭐½</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
