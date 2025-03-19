import "./FeaturedDeveloper.css";

const FeaturedDeveloper = () => {
    return (
        <section className="featured-developer">
            <div className="developer-card">
                <div className="developer-content">
                    {/* Developer Info */}
                    <div className="developer-info">
                        <div className="developer-box">
                            <div className="developer-header">
                                <div className="developer-logo">A</div>
                                <div className="developer-details">
                                    <h3 className="developer-name">Assetz Property Group</h3>
                                    <div className="developer-rating">
                                        <div className="stars">⭐⭐⭐⭐⭐</div>
                                        <span className="review-count">(245 reviews)</span>
                                    </div>
                                </div>
                            </div>
                            <p className="developer-description">
                                Premium developer with 15+ years of experience in luxury residential projects.
                            </p>
                            <a href="#" className="view-projects-btn">View Projects</a>
                        </div>
                        <div className="developer-tags">
                            <span className="tag">15+ Projects</span>
                            <span className="tag">Bangalore</span>
                            <span className="tag">Luxury</span>
                        </div>
                    </div>

                    {/* Property Image */}
                    <div className="developer-image">
                        <img 
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                            alt="Featured Property" 
                            className="property-img"
                        />
                        <div className="image-overlay">
                            <div className="image-text">
                                <h3 className="propertytitle">Assetz Marq 2.0</h3>
                                <p className="property-description">Luxury apartments in East Bangalore with premium amenities</p>
                                <div className="button-group">
                                    <button className="view-details-btn">View Details</button>
                                    <button className="book-visit-btn">Book a Visit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedDeveloper;
